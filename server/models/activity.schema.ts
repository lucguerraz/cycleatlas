import { defineMongooseModel } from '#nuxt/mongoose'

export const ActivitySchema = defineMongooseModel({
  name: 'Activity',
  schema: {
    stravaid: {
      type: Number,
      required: true,
      unique: true,
    },
    athleteid: {
      type: Number,
      required: true,
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
    sport_type: {
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
    trainer: {
      type: Boolean,
      required: true,
    },
    gear_id: {
      type: String,
      required: true,
    },
    start_latlng: {
      type: Array,
      required: true,
    },
    end_latlng: {
      type: Array,
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
})
