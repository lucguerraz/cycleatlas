export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    const activity = await ActivitySchema.findOne({ stravaid: event.context.params?.id, athleteid: user.id })
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
