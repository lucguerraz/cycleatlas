import { jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const { loggedIn } = await getUserSession(event)

  if (loggedIn) {
    return sendRedirect(event, '/')
  }

  const { token } = getQuery(event)

  if (!token) {
    return sendRedirect(event, '/login')
  }

  try {
    const { payload } = await jwtVerify(token as string, new TextEncoder().encode(config.auth.signingSecret), {
      algorithms: ['HS256'],
    })

    const athlete = await AthleteSchema.findOne({ email: payload.email as string })

    if (!athlete) {
      return sendRedirect(event, '/login')
    }

    if (!(payload.scope as string[]).includes('verify')) {
      return sendRedirect(event, '/login')
    }

    await setUserSession(event, {
      user: {
        name: athlete.email,
        id: athlete.id,
      },
      secure: {},
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/')
  } catch {
    return sendRedirect(event, '/login')
  }
})
