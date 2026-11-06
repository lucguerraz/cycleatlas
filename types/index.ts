import type { ObjectId } from 'mongoose'

export interface Activity {
  _id: ObjectId
  garminid: number
  athlete: Athlete | ObjectId
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  device_name: string
  start_date: string
  start_latlng: [number, number]
  end_latlng: [number, number]
  average_speed: number
  average_cadence: number
  average_watts: number
  normalized_watts: number
  average_heartrate: number
  geojson: ActivityFeatureCollection
  countries: Countries
}

export interface Stats {
  distance: number
  elevation: number
  moving_time: number
  elapsed_time: number
  ridecount: number
  countries: Countries
  sources: string[]
}

export interface Countries {
  [key: string]: {
    regions:
      | {
          [key: string]: {
            distance: number
          }
        }
      | undefined
    distance: number
  }
}

export type ActivityFeature = GeoJSON.Feature<GeoJSON.LineString, { name: string; time: string[]; elevation: number[] }>
export type ActivityFeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.LineString,
  {
    name: string
    time: string[]
    elevation: number[]
    cadence: number[]
    heartrate: number[]
    power: number[]
  }
>

export interface Athlete {
  _id: ObjectId
  email: string
  apikey: string
  token: string
  expires_at: number
  processing_intital_data: Boolean
  jobs: string[]
}
