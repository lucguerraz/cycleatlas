import type { ProcessActivityData, ProcessActivityResult, ProcessActivityName } from '#server/queues/processActivity'
import type { Activity, ActivityFeatureCollection, Athlete, Countries } from '~~/types'

import { defineWorker } from '#processor'
import * as turf from '@turf/turf'
import { readFile } from 'node:fs/promises'
import { fetchStrava } from '#server/utils/workers/strava'

export default defineWorker<ProcessActivityName, ProcessActivityData, ProcessActivityResult>({
  name: 'processActivity',
  async processor(job) {
    const beginAt = Date.now()

    try {
      const athleteStravaId = job.data.athleteStravaId
      const activityStravaId = job.data.activityStravaId

      // @ts-ignore
      let athlete = (await AthleteSchema.findOne({ stravaid: athleteStravaId })) as Athlete
      if (!athlete) throw new Error('Athlete was not found')

      // @ts-ignore
      const existingActivity = await ActivitySchema.findOne({ stravaid: activityStravaId })
      if (existingActivity) return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' }

      let stravaActivity
      if (job.data.stravaActivity === null) {
        const { activity: newStravaActivity, newAthlete: newAthlete } = await fetch_activity(activityStravaId, athlete)
        stravaActivity = newStravaActivity
        athlete = newAthlete
      } else {
        stravaActivity = job.data.stravaActivity
      }

      if (stravaActivity === null) throw new Error('Could not get activity') // fetch failed or activity is null
      if (stravaActivity.type !== 'Ride') {
        return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' } // not a ride activity
      }

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
        geojson: {},
        countries: {},
      } as Activity

      await new ActivitySchema(dbActivity).save()

      const { geojson, newAthlete: newAthlete } = await build_geojson(stravaActivity, athlete)
      athlete = newAthlete

      const countries = await compute_regions(geojson)

      const dbGeoData = {
        geojson: geojson,
        countries: countries,
      }

      // @ts-ignore
      await ActivitySchema.updateOne({ stravaid: stravaActivity.id }, dbGeoData)

      return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' }
    } catch (err) {
      console.error(err)
      return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'error' }
    }
  },
  options: {},
})

const fetch_activity = async (activityStravaId: number, athlete: Athlete) => {
  try {
    const { data: activity, athlete: newAthlete } = await fetchStrava(`/activities/${activityStravaId}`, athlete)

    return {
      activity: activity,
      newAthlete,
    }
  } catch (error) {
    return {
      activity: null,
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
