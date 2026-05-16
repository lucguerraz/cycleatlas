import { defineQueue } from '#processor'

export type ProcessInitialActivitiesName = 'processInitialActivities'
export type ProcessInitialActivitiesData = { athleteStravaId: number }
export type ProcessInitialActivitiesResult = {
  processedAt: number
  finishedProcessingAt: number
  status: 'success' | 'error'
}

export default defineQueue<ProcessInitialActivitiesData, ProcessInitialActivitiesResult, ProcessInitialActivitiesName>({
  name: 'processInitialActivities',
  options: {},
})
