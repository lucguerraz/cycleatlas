import { jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const { loggedIn } = await getUserSession(event)

  if (loggedIn) {
    throw createError({
      statusCode: 400,
      message: 'Already loggedin',
    })
  }

  const { token } = getQuery(event)

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Authentication link is invalid',
    })
  }

  try {
    const { payload } = await jwtVerify(token as string, new TextEncoder().encode(config.auth.signingSecret), {
      algorithms: ['HS256'],
    })

    const athlete = await AthleteSchema.findOne({ email: payload.email as string })

    if (athlete) {
      throw createError({
        statusCode: 400,
        message: 'Authentication link is invalid',
      })
    }

    if (!(payload.scope as string[]).includes('complete-setup')) {
      throw createError({
        statusCode: 400,
        message: 'Authentication link is invalid',
      })
    }

    return {
      status: 'all good',
    }
  } catch {
    throw createError({
      statusCode: 400,
      message: 'Authentication link is invalid',
    })
  }
})
