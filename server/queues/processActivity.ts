import { defineQueue } from '#processor'
import type { ObjectId } from 'mongoose'

export type ProcessActivityName = 'processActivity'
export type ProcessActivityData = { athleteId: ObjectId; activityGarminId: number; garminActivity: object | null }
export type ProcessActivityResult = {
  processedAt: number
  finishedProcessingAt: number
  status: 'success' | 'error'
}

export default defineQueue<ProcessActivityData, ProcessActivityResult, ProcessActivityName>({
  name: 'processActivity',
  options: {},
})
