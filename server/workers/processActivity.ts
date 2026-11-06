import type { ProcessActivityData, ProcessActivityResult, ProcessActivityName } from '#server/queues/processActivity'
import type { Activity, ActivityFeatureCollection, Athlete, Countries } from '~~/types'
import type { ActivitySummaryDTO, SummarizedActivityDTO } from '~~/types/garmin'

import { defineWorker } from '#processor'
import * as turf from '@turf/turf'
import AdmZip from 'adm-zip'
import fitParser from 'fit-file-parser'
import { fetchGarmin } from '#server/utils/workers/garmin'
import { AthleteSchema } from '#server/models/athlete.schema'
import { ActivitySchema } from '#server/models/activity.schema'

export default defineWorker<ProcessActivityName, ProcessActivityData, ProcessActivityResult>({
  name: 'processActivity',
  async processor(job) {
    const beginAt = Date.now()

    try {
      const athleteId = job.data.athleteId
      const activityGarminId = job.data.activityGarminId

      let athlete = (await AthleteSchema.findById(athleteId)) as Athlete
      if (!athlete) throw new Error('Athlete was not found')

      const existingActivity = await ActivitySchema.findOne({ garminid: activityGarminId })
      if (existingActivity) return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' }

      let garminActivity
      if (job.data.garminActivity === null) {
        const { activity: newgarminActivity, newAthlete: newAthlete } = await fetch_activity(activityGarminId, athlete)
        garminActivity = newgarminActivity
        athlete = newAthlete
      } else {
        garminActivity = job.data.garminActivity as SummarizedActivityDTO
      }

      if (garminActivity === null) throw new Error('Could not get activity') // fetch failed or activity is null

      if ((garminActivity as any).summaryDTO) {
        garminActivity = garminActivity as ActivitySummaryDTO
        garminActivity = {
          activityId: garminActivity.activityId,
          activityName: garminActivity.activityName,
          activityType: garminActivity.activityTypeDTO,
          ...garminActivity.summaryDTO,
          ...garminActivity.metadataDTO,
          averageBikingCadenceInRevPerMinute: garminActivity.summaryDTO?.averageBikeCadence || 0,
          avgPower: garminActivity.summaryDTO?.averagePower || 0,
          normPower: garminActivity.summaryDTO?.normalizedPower || 0,
        }
      } else {
        garminActivity = garminActivity as SummarizedActivityDTO
      }

      if (
        garminActivity == null ||
        garminActivity.activityId == null ||
        garminActivity.activityName == null ||
        garminActivity.distance == null ||
        garminActivity.movingDuration == null ||
        garminActivity.elapsedDuration == null ||
        garminActivity.elevationGain == null ||
        garminActivity.activityType?.typeKey == null ||
        garminActivity.manufacturer == null ||
        garminActivity.startTimeLocal == null ||
        garminActivity.startLatitude == null ||
        garminActivity.startLongitude == null ||
        garminActivity.endLatitude == null ||
        garminActivity.endLongitude == null ||
        garminActivity.averageSpeed == null
      ) {
        throw new Error('Some required activity data is missing')
      }

      const dbActivity = {
        garminid: garminActivity.activityId,
        athlete: athlete._id,
        name: garminActivity.activityName,
        distance: garminActivity.distance,
        moving_time: garminActivity.movingDuration,
        elapsed_time: garminActivity.elapsedDuration,
        total_elevation_gain: garminActivity.elevationGain,
        type: garminActivity.activityType.typeKey,
        device_name: garminActivity.manufacturer,
        start_date: garminActivity.startTimeLocal,
        start_latlng: [garminActivity.startLatitude, garminActivity.startLongitude],
        end_latlng: [garminActivity.endLatitude, garminActivity.endLongitude],
        average_speed: garminActivity.averageSpeed,
        average_cadence: garminActivity.averageBikingCadenceInRevPerMinute || 0,
        average_watts: garminActivity.avgPower || 0,
        normalized_watts: garminActivity.normPower || 0,
        average_heartrate: garminActivity.averageHR || 0,
        geojson: {},
        countries: {},
      } as Activity

      await new ActivitySchema(dbActivity).save()

      const { geojson, newAthlete: newAthlete } = await build_geojson(garminActivity, athlete)
      athlete = newAthlete

      const countries = await compute_regions(geojson)

      const dbGeoData = {
        geojson: geojson,
        countries: countries,
      }

      await ActivitySchema.updateOne({ garminid: garminActivity.activityId }, dbGeoData)

      return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' }
    } catch (err) {
      console.error(err)
      return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'error' }
    }
  },
  options: {
    lockDuration: 180_000,
    stalledInterval: 60_000,
  },
})

const fetch_activity = async (activityGarminId: number, athlete: Athlete) => {
  try {
    const { data: activity, athlete: newAthlete } = await fetchGarmin(
      `/activity-service/activity/${activityGarminId}`,
      athlete
    )

    return {
      activity: activity as ActivitySummaryDTO,
      newAthlete,
    }
  } catch (error) {
    return {
      activity: null,
      newAthlete: athlete,
    }
  }
}

const build_geojson = async (garminActivity: any, athlete: Athlete) => {
  try {
    const { data: buffer, athlete: newAthlete } = await fetchGarmin(
      `/download-service/files/activity/${garminActivity.activityId}`,
      athlete,
      true
    )

    const zip = new AdmZip(buffer)
    const entry = zip.getEntries()[0]
    if (!entry) throw new Error('Zip is empty')

    const fitContents = Buffer.from(entry.getData())
    const fitObject = await new fitParser().parseAsync(fitContents)

    const geojson: ActivityFeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: 'My Activity',
            elevation: [],
            time: [],
            cadence: [],
            power: [],
            heartrate: [],
          },
          geometry: {
            type: 'LineString',
            coordinates: [] as [number, number][],
          },
        },
      ],
    }

    if (!fitObject.records) throw new Error('FIT records unavailable')

    for (let i = 0; i < fitObject.records.length; i++) {
      const point = fitObject.records[i]

      if (!point) continue

      if (point.position_long && point.position_lat)
        geojson.features[0]!.geometry.coordinates.push([point.position_long, point.position_lat])

      if (point.enhanced_altitude) geojson.features[0]!.properties.elevation.push(point.enhanced_altitude)

      if (point.timestamp) geojson.features[0]!.properties.time.push(point.timestamp.toDateString())

      if (point.cadence) geojson.features[0]!.properties.cadence.push(point.cadence)

      if (point.power) geojson.features[0]!.properties.power.push(point.power)

      if (point.heart_rate) geojson.features[0]!.properties.heartrate.push(point.heart_rate)
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
              name: garminActivity.activityName,
              elevation: [],
              time: [],
              cadence: [],
              power: [],
              heartrate: [],
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
  const assets = useStorage('assets/server/geofiles')
  // @ts-ignore
  const GEOJSON_COUNTRIES = JSON.parse(Buffer.from(await assets.getItemRaw('countries.geojson')).toString('utf8'))

  const countries = computeIntersections(geojson, GEOJSON_COUNTRIES) as Countries

  for (const countryISO in countries) {
    const country = countries[countryISO]
    if (!country) continue

    if (['AT', 'BE', 'CH', 'DE', 'FR', 'IT'].includes(countryISO)) {
      const GEOJSON_REGION = JSON.parse(
        // @ts-ignore
        Buffer.from(await assets.getItemRaw(`regions_${countryISO.toLowerCase()}.geojson`)).toString('utf8')
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
