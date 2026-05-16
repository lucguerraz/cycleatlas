import type {
  ProcessInitialActivitiesData,
  ProcessInitialActivitiesResult,
  ProcessInitialActivitiesName,
} from '#server/queues/processInitialActivities'
import type { Activity, ActivityFeatureCollection, Athlete, Countries } from '~~/types'

import { defineWorker } from '#processor'
import * as turf from '@turf/turf'
import { readFile } from 'node:fs/promises'

const config = useRuntimeConfig()

export default defineWorker<ProcessInitialActivitiesName, ProcessInitialActivitiesData, ProcessInitialActivitiesResult>(
  {
    name: 'processInitialActivities',
    async processor(job) {
      const beginAt = Date.now()

      try {
        const athleteStravaId = job.data.athleteStravaId

        // @ts-ignore
        let athlete = (await AthleteSchema.findOne({ stravaid: athleteStravaId })) as Athlete
        if (!athlete) throw new Error('Athlete was not found')

        const { activities: stravaActivities, newAthlete: newAthlete } = await fetch_activities(athlete)
        athlete = newAthlete

        for (const stravaActivity of stravaActivities) {
          const existingActivity = await ActivitySchema.findOne({ stravaid: stravaActivity.id })
          if (existingActivity) continue

          const { geojson, newAthlete: newAthlete } = await build_geojson(stravaActivity, athlete)
          athlete = newAthlete

          const countries = await compute_regions(geojson)

          const dbActivity = {
            athleteid: athlete.stravaid,
            name: stravaActivity.name,
            distance: stravaActivity.distance,
            moving_time: stravaActivity.moving_time,
            elapsed_time: stravaActivity.elapsed_time,
            total_elevation_gain: stravaActivity.total_elevation_gain,
            type: stravaActivity.type,
            sport_type: stravaActivity.sport_type,
            device_name: stravaActivity.device_name ? stravaActivity.device_name : 'None',
            stravaid: stravaActivity.id,
            start_date: stravaActivity.start_date,
            trainer: stravaActivity.trainer,
            gear_id: stravaActivity.gear_id ? stravaActivity.gear_id : 'None',
            start_latlng: stravaActivity.start_latlng,
            end_latlng: stravaActivity.end_latlng,
            average_speed: stravaActivity.average_speed,
            average_cadence: stravaActivity.average_cadence || 0,
            average_watts: stravaActivity.average_watts || 0,
            average_heartrate: stravaActivity.average_heartrate || 0,
            geojson: geojson,
            countries: countries,
          } as Activity

          await new ActivitySchema(dbActivity).save()
        }

        // @ts-ignore
        await AthleteSchema.updateOne({ stravaid: athlete.stravaid }, { processing_intital_data: false })

        return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' }
      } catch (err) {
        console.error(err)
        return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'error' }
      }
    },
    options: {},
  }
)

const fetch_activities = async (athlete: Athlete) => {
  try {
    let newAthlete = athlete
    const activities = []
    let currentPage = 1
    let lastPageActivityCount = 0

    do {
      const { data: pageActivities, athlete: pageNewAthlete } = await fetchStrava(
        `/athlete/activities?per_page=50&page=${currentPage}`,
        newAthlete
      )

      activities.push(...pageActivities)
      newAthlete = pageNewAthlete

      currentPage++
      lastPageActivityCount = pageActivities.length
    } while (lastPageActivityCount !== 0)

    return {
      activities: activities.filter((activity: any) => activity.type === 'Ride'),
      newAthlete,
    }
  } catch (error) {
    return {
      activities: [],
      newAthlete: athlete,
    }
  }
}

const build_geojson = async (stravaActivity: any, athlete: Athlete) => {
  try {
    const searchParams = new URLSearchParams({
      keys: '[latlng,time,altitude]',
      key_by_type: 'true',
    })

    const { data: streams, athlete: newAthlete } = await fetchStrava(
      `/activities/${stravaActivity.id}/streams?${searchParams}`,
      athlete
    )

    const startTimeraw = stravaActivity.start_date

    const startTime = new Date(startTimeraw)

    const geojson: ActivityFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: stravaActivity.name,
            time: [],
            elevation: [],
          },
          geometry: {
            type: 'LineString',
            coordinates: [] as [number, number][],
          },
        },
      ],
    }

    for (let index = 0; index < streams.latlng.data.length; index++) {
      const lat = streams.latlng.data[index][0]
      const lon = streams.latlng.data[index][1]
      const ele = streams.altitude.data[index]
      const timeOffset = streams.time.data[index]
      const time = new Date(startTime.getTime() + timeOffset * 1000).toISOString().slice(0, 19) + 'Z'

      geojson.features[0]!.geometry.coordinates.push([lon, lat])
      geojson.features[0]!.properties.elevation.push(ele)
      geojson.features[0]!.properties.time.push(time)
    }

    return {
      geojson,
      newAthlete,
    }
  } catch (error) {
    return {
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              name: stravaActivity.name,
              time: [],
              elevation: [],
            },
            geometry: {
              type: 'LineString',
              coordinates: [],
            },
          },
        ],
      },
      newAthlete: athlete,
    }
  }
}

const compute_regions = async (geojson: any) => {
  const GEOJSON_COUNTRIES = JSON.parse(await readFile('./server/utils/geofiles/countries.geojson', 'utf8'))

  const countries = computeIntersections(geojson, GEOJSON_COUNTRIES) as Countries

  for (const countryISO in countries) {
    const country = countries[countryISO]
    if (!country) continue

    if (['AT', 'CH', 'DE', 'FR', 'IT'].includes(countryISO)) {
      const GEOJSON_REGION = JSON.parse(
        await readFile(`./server/utils/geofiles/regions_${countryISO.toLowerCase()}.geojson`, 'utf8')
      )
      country.regions = computeIntersections(geojson, GEOJSON_REGION)
    }
  }

  return countries
}

const computeIntersections = (trackGeoJson: any, mapGeoJson: any) => {
  const returnVal = {} as { [key: string]: { distance: number } }

  const chunkSizeKm = 0.01 // 10 m
  const chunks = turf.lineChunk(trackGeoJson, chunkSizeKm) // FeatureCollection<LineString>

  for (const chunk of chunks.features) {
    const firstCord = chunk.geometry.coordinates[0]
    const lastCord = chunk.geometry.coordinates[chunk.geometry.coordinates.length - 1]

    if (!firstCord || !lastCord) continue

    const chunkMidpoint = turf.midpoint(firstCord, lastCord)

    const intersection = mapGeoJson.features.find((poly: any) => turf.booleanPointInPolygon(chunkMidpoint, poly))

    if (!intersection) continue

    const intersectionISO3166 =
      intersection.properties.ISO_3166_2 || intersection.properties.ISO_3166_1 || intersection.properties.ISO_A2_EH

    const chunkLength = turf.length(chunk, { units: 'meters' })

    if (!returnVal[intersectionISO3166]) {
      returnVal[intersectionISO3166] = {
        distance: 0,
      }
    }
    returnVal[intersectionISO3166].distance = returnVal[intersectionISO3166].distance + chunkLength
  }

  return returnVal
}

const fetchStrava = async (endpoint: string, athlete: Athlete) => {
  try {
    if (athlete.expires_at <= Date.now() / 1000) {
      console.warn(`AccessToken has expired, refreshing token first...`)
      const newAthlete = await refreshStravaToken(athlete)
      return fetchStrava(endpoint, newAthlete)
    }

    const res = await fetch(`https://www.strava.com/api/v3${endpoint}`, {
      headers: {
        Authorization: `Bearer ${athlete.access_token}`,
      },
    })

    if (res.status === 401) {
      console.warn(`401 received - refreshing token and retrying...`)
      const newAthlete = await refreshStravaToken(athlete)
      return fetchStrava(endpoint, newAthlete)
    }

    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After')
      const waitMs = retryAfter ? Math.max(0, parseInt(retryAfter, 10) * 1000) : 1000 // default to 1 s if header is missing

      console.warn(`429 received - waiting ${waitMs} ms before retrying...`)
      await new Promise((r) => setTimeout(r, waitMs))

      return fetchStrava(endpoint, athlete)
    }

    if (!res.ok) {
      const errBody = await res.text()
      throw new Error(`HTTP ${res.status} – ${res.statusText}\n${errBody}`)
    }

    return {
      data: await res.json(),
      athlete,
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch failed: ${error.message}`)
    }
    throw error
  }
}

const refreshStravaToken = async (athlete: Athlete) => {
  const res = await fetch(`https://www.strava.com/api/v3/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: config.oauth.strava.clientId,
      client_secret: config.oauth.strava.clientSecret,
      refresh_token: athlete.refresh_token,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`HTTP ${res.status} – ${res.statusText}\n${errBody}`)
  }

  const tokens = await res.json()

  const newAthlete = (await AthleteSchema.findOneAndUpdate(
    // @ts-ignore
    { stravaid: athlete.stravaid },
    { access_token: tokens.access_token, expires_at: tokens.expires_at, refresh_token: tokens.refresh_token },
    { returnDocument: 'after' }
  )) as unknown as Athlete

  return newAthlete
}
