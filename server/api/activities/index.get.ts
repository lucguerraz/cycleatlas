export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    return await ActivitySchema.find({ athleteid: user.id }).sort({ start_date: -1 })
  } catch (error) {
    return error
  }
})
