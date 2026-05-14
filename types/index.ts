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
  geojson: GeoJSON.GeoJSON
  countries: object
}
