import { getInclusionsFromParam } from '#server/utils/activityInclusionsFromParam'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const inclusion = getInclusionsFromParam(event)

  try {
    return await ActivitySchema.find(
      { athleteid: user.id, geojson: { $exists: true, $not: { $eq: {} } } },
      inclusion
    ).sort({ start_date: -1 })
  } catch (error) {
    return error
  }
})
