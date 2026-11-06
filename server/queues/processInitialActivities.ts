import { defineQueue } from '#processor'
import type { ObjectId } from 'mongoose'

export type ProcessInitialActivitiesName = 'processInitialActivities'
export type ProcessInitialActivitiesData = { athleteId: ObjectId }
export type ProcessInitialActivitiesResult = {
  processedAt: number
  finishedProcessingAt: number
  status: 'success' | 'error'
}

export default defineQueue<ProcessInitialActivitiesData, ProcessInitialActivitiesResult, ProcessInitialActivitiesName>({
  name: 'processInitialActivities',
  options: {},
})
