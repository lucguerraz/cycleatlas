import { Activity } from '~~/types'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    const oldestActivity = (await ActivitySchema.findOne({ athleteid: user.id }, { start_date: 1 }).sort({
      start_date: 1,
    })) as unknown as Activity

    if (!oldestActivity) {
      return []
    }

    const oldestActivityYear = new Date(oldestActivity.start_date).getFullYear()
    const now = new Date().getFullYear()

    const years = Array.from({ length: now - oldestActivityYear + 1 }, (_, i) => oldestActivityYear + i).reverse()

    return years
  } catch (error) {
    return error
  }
})
