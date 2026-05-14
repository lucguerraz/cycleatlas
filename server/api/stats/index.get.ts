import { Activity } from '~~/types'
import mergeDeep from '#server/utils/mergeDeep'
import sortObjectKeys from '#server/utils/sortObjectKeys'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const query = getQuery(event)
  const yParam = query.y as string
  const year = yParam ? yParam : '*'

  try {
    const options = { athleteid: user.id } as { [key: string]: any }

    if (!isNaN(parseInt(year))) {
      options.start_date = {
        $gte: parseInt(year) + '-01-01T00:00:00.000Z',
        $lt: parseInt(year) + 1 + '-01-01T00:00:00.000Z',
      }
    }

    const allActivities = (await ActivitySchema.find(options)) as Activity[]

    const distance = allActivities.reduce((counter, activity) => counter + activity.distance, 0)
    const elevation = allActivities.reduce((counter, activity) => counter + activity.total_elevation_gain, 0)
    const moving_time = allActivities.reduce((counter, activity) => counter + activity.moving_time, 0)
    const elapsed_time = allActivities.reduce((counter, activity) => counter + activity.elapsed_time, 0)
    const ridecount = allActivities.length

    const countries = sortObjectKeys(allActivities.reduce((obj, activity) => mergeDeep(obj, activity.countries), {}))

    return {
      distance,
      elevation,
      moving_time,
      elapsed_time,
      ridecount,
      countries,
    }
  } catch (error) {
    return error
  }
})
