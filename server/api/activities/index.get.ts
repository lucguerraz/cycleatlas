export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    return await ActivitySchema.find({ athleteid: user.id })
  } catch (error) {
    return error
  }
})
