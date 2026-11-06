import { defineMongooseModel } from '#nuxt/mongoose'
import { Activity } from '~~/types'
import { Types } from 'mongoose'

export const ActivitySchema = defineMongooseModel<Activity>({
  name: 'Activity',
  schema: {
    garminid: {
      type: Number,
      required: true,
      unique: true,
    },
    athlete: {
      type: Types.ObjectId,
      required: true,
      ref: 'Athlete',
    },
    name: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    moving_time: {
      type: Number,
      required: true,
    },
    elapsed_time: {
      type: Number,
      required: true,
    },
    total_elevation_gain: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    device_name: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    start_latlng: {
      type: [Number, Number],
      required: true,
    },
    end_latlng: {
      type: [Number, Number],
      required: true,
    },
    average_speed: {
      type: Number,
      required: true,
    },
    average_cadence: {
      type: Number,
      required: true,
    },
    average_watts: {
      type: Number,
      required: true,
    },
    normalized_watts: {
      type: Number,
      required: true,
    },
    average_heartrate: {
      type: Number,
      required: true,
    },
    geojson: {
      type: Object,
      required: true,
    },
    countries: {
      type: Object,
      required: true,
    },
  },
  options: {
    collection: 'garmin_activities',
  },
})
