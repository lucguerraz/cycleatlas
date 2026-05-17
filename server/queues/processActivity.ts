import { defineQueue } from '#processor'

export type ProcessActivityName = 'processActivity'
export type ProcessActivityData = { athleteStravaId: number; activityStravaId: number; stravaActivity: object | null }
export type ProcessActivityResult = {
  processedAt: number
  finishedProcessingAt: number
  status: 'success' | 'error'
}

export default defineQueue<ProcessActivityData, ProcessActivityResult, ProcessActivityName>({
  name: 'processActivity',
  options: {},
})
