import { Activity } from '~~/types'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  try {
    const oldestActivity = (await ActivitySchema.find({ athleteid: user.id })
      .sort({ start_date: 1 })
      .limit(1)) as unknown as Activity[]

    if (!oldestActivity[0]) {
      return []
    }

    const oldestActivityYear = new Date(oldestActivity[0].start_date).getFullYear()
    const now = new Date().getFullYear()

    const years = Array.from({ length: now - oldestActivityYear + 1 }, (_, i) => oldestActivityYear + i).reverse()

    return years
  } catch (error) {
    return error
  }
})
