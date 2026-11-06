import { getInclusionsFromParam } from '#server/utils/activityInclusionsFromParam'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const inclusion = getInclusionsFromParam(event)

  try {
    const activity = await ActivitySchema.findOne({ garminid: event.context.params?.id, athlete: user.id }, inclusion)
    if (!activity) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not found',
        message: 'Activity not found',
      })
    }
    return activity
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not found',
      message: 'Activity not found',
    })
  }
})
