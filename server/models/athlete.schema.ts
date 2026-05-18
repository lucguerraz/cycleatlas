import { defineMongooseModel } from '#nuxt/mongoose'

export const AthleteSchema = defineMongooseModel({
  name: 'Athlete',
  schema: {
    stravaid: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
    },
    expires_at: {
      type: Number,
    },
    refresh_token: {
      type: String,
    },
    processing_intital_data: {
      type: Boolean,
    },
    jobs: {
      type: Array,
    },
  },
})
