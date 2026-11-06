export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    return navigateTo('/')
  }

  if (!to.query.token) {
    return navigateTo('/login')
  }
  const token = to.query.token as string

  try {
    await useRequestFetch()(`/api/auth/setup?token=${token}`)
  } catch (err: any) {
    if (err?.statusCode === 400) {
      return navigateTo('/login')
    }
    return abortNavigation(createError({ statusCode: 500, statusMessage: 'Service unavailable' }))
  }
})
