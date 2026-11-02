import { jwtVerify, errors } from 'jose'
import queue from '#server/queues/processInitialActivities'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const body = await readBody<{ apikey?: string; token?: string }>(event)

  const apikey = body?.apikey?.trim()
  if (!apikey) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide a Garmin API key.',
    })
  }

  const token = body?.token?.trim()
  if (!token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Authentication link is malformed.',
    })
  }

  let payload
  try {
    const jwtdecode = await jwtVerify(token, new TextEncoder().encode(config.auth.signingSecret), {
      algorithms: ['HS256'],
    })
    payload = jwtdecode.payload
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication link has expired.',
      })
    }

    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication link is invalid.',
    })
  }

  const existingAthlete = await AthleteSchema.findOne({ email: payload.email as string })
  if (existingAthlete) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Setup has already been completed.',
    })
  }

  if (!(payload.scope as string[]).includes('complete-setup')) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You can not perform this action with this link.',
    })
  }

  const res = await fetch(
    `https://personal.connectapi.garmin.com/personalapitoken-service/personal-api/personal-api-key/token`,
    {
      method: 'POST',
      headers: { Authorization: `ApiKey ${apikey}` },
    }
  )

  if (!res.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: 'API key is invalid or could not be verified.',
    })
  }

  const garminToken = await res.text()
  const tokenContents = JSON.parse(Buffer.from(token.split('.')[1] || '', 'base64').toString())

  const athlete = await new AthleteSchema({
    email: payload.email,
    apikey,
    token: garminToken,
    expires_at: tokenContents.exp,
    processing_intital_data: true,
    jobs: [],
  }).save()

  await setUserSession(event, {
    user: {
      name: athlete.email,
      id: athlete.id,
    },
    secure: {},
    loggedInAt: Date.now(),
  })

  return {
    msg: 'Account setup is complete.',
  }
})
