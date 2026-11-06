import { defineQueue } from '#processor'
import type { ObjectId } from 'mongoose'

export type ProcessRefreshActivitiesName = 'processRefreshActivities'
export type ProcessRefreshActivitiesData = { athleteId: ObjectId }
export type ProcessRefreshActivitiesResult = {
  processedAt: number
  finishedProcessingAt: number
  status: 'success' | 'error'
}

export default defineQueue<ProcessRefreshActivitiesData, ProcessRefreshActivitiesResult, ProcessRefreshActivitiesName>({
  name: 'processRefreshActivities',
  options: {},
})
