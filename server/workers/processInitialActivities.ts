import type {
  ProcessInitialActivitiesData,
  ProcessInitialActivitiesResult,
  ProcessInitialActivitiesName,
} from '#server/queues/processInitialActivities'
import type { Athlete } from '~~/types'

import { defineWorker } from '#processor'
import queue from '#server/queues/processActivity'
import { fetchGarmin } from '#server/utils/workers/garmin'
import { AthleteSchema } from '#server/models/athlete.schema'
import { ActivitySchema } from '#server/models/activity.schema'

export default defineWorker<ProcessInitialActivitiesName, ProcessInitialActivitiesData, ProcessInitialActivitiesResult>(
  {
    name: 'processInitialActivities',
    async processor(job) {
      const beginAt = Date.now()

      try {
        const athleteId = job.data.athleteId

        let athlete = (await AthleteSchema.findById(athleteId)) as Athlete
        if (!athlete) throw new Error('Athlete was not found')

        const { activities: garminActivities, newAthlete: newAthlete } = await fetch_activities(athlete)
        athlete = newAthlete

        for (const garminActivity of garminActivities) {
          const existingActivity = await ActivitySchema.findOne({ garminid: garminActivity.activityId })
          if (existingActivity) continue

          const jobUUID = crypto.randomUUID()
          await AthleteSchema.updateOne({ _id: athlete._id }, { $push: { jobs: jobUUID } })
          await queue.add(
            'processActivity',
            { athleteId, activityGarminId: garminActivity.activityId, garminActivity },
            {
              jobId: jobUUID,
            }
          )
        }

        await AthleteSchema.updateOne({ _id: athlete._id }, { processing_intital_data: false })

        return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'success' }
      } catch (err) {
        console.error(err)
        return { processedAt: beginAt, finishedProcessingAt: Date.now(), status: 'error' }
      }
    },
    options: {},
  }
)

const fetch_activities = async (athlete: Athlete) => {
  try {
    let newAthlete = athlete
    const activities = []
    let activityOffset = 0
    let lastPageActivityCount = 0

    do {
      const { data: reguestActivities, athlete: reguestNewAthlete } = await fetchGarmin(
        `/activitylist-service/activities/search/activities?activityType=cycling&limit=50&start=${activityOffset}`,
        newAthlete
      )

      activities.push(...reguestActivities)
      newAthlete = reguestNewAthlete

      lastPageActivityCount = reguestActivities.length
      activityOffset = activityOffset + lastPageActivityCount
    } while (lastPageActivityCount !== 0)

    return {
      activities: activities,
      newAthlete,
    }
  } catch (error) {
    return {
      activities: [],
      newAthlete: athlete,
    }
  }
}
