import type {
  ProcessInitialActivitiesData,
  ProcessInitialActivitiesResult,
  ProcessInitialActivitiesName,
} from '#server/queues/processInitialActivities'
import type { Athlete } from '~~/types'

import { defineWorker } from '#processor'
import queue from '#server/queues/processActivity'
import { fetchStrava } from '#server/utils/workers/strava'

export default defineWorker<ProcessInitialActivitiesName, ProcessInitialActivitiesData, ProcessInitialActivitiesResult>(
  {
    name: 'processInitialActivities',
    async processor(job) {
      const beginAt = Date.now()

      try {
        const athleteStravaId = job.data.athleteStravaId

        // @ts-ignore
        let athlete = (await AthleteSchema.findOne({ stravaid: athleteStravaId })) as Athlete
        if (!athlete) throw new Error('Athlete was not found')

        const { activities: stravaActivities, newAthlete: newAthlete } = await fetch_activities(athlete)
        athlete = newAthlete

        for (const stravaActivity of stravaActivities) {
          const existingActivity = await ActivitySchema.findOne({ stravaid: stravaActivity.id })
          if (existingActivity) continue

          const jobUUID = crypto.randomUUID()
          // @ts-ignore
          await AthleteSchema.updateOne({ stravaid: athlete.stravaid }, { $push: { jobs: jobUUID } })
          await queue.add(
            'processActivity',
            { athleteStravaId, activityStravaId: stravaActivity.id, stravaActivity },
            {
              jobId: jobUUID,
            }
          )
        }

        // @ts-ignore
        await AthleteSchema.updateOne({ stravaid: athlete.stravaid }, { processing_intital_data: false })

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
    let currentPage = 1
    let lastPageActivityCount = 0

    do {
      const { data: pageActivities, athlete: pageNewAthlete } = await fetchStrava(
        `/athlete/activities?per_page=50&page=${currentPage}`,
        newAthlete
      )

      activities.push(...pageActivities)
      newAthlete = pageNewAthlete

      currentPage++
      lastPageActivityCount = pageActivities.length
    } while (lastPageActivityCount !== 0)

    return {
      activities: activities.filter((activity: any) => activity.type === 'Ride'),
      newAthlete,
    }
  } catch (error) {
    return {
      activities: [],
      newAthlete: athlete,
    }
  }
}
