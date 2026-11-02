import { defineMongooseModel } from '#nuxt/mongoose'
import { Athlete } from '~~/types'

export const AthleteSchema = defineMongooseModel<Athlete>({
  name: 'Athlete',
  schema: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    apikey: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Number,
      required: true,
    },
    processing_intital_data: {
      type: Boolean,
      required: true,
    },
    jobs: {
      type: [String],
      required: true,
    },
  },
  options: {
    collection: 'garmin_athletes',
  },
})
