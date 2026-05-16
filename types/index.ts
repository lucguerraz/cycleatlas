import type { ObjectId } from 'mongoose'

export interface Activity {
  _id: ObjectId
  athleteid: number
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  sport_type: string
  device_name: string
  stravaid: number
  start_date: string
  trainer: boolean
  gear_id: string
  start_latlng: [number, number]
  end_latlng: [number, number]
  average_speed: number
  average_cadence: number
  average_watts: number
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
  { name: string; time: string[]; elevation: number[] }
>

export interface Athlete {
  stravaid: number
  name: string
  access_token: string
  expires_at: number
  refresh_token: string
}
