import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const query = getQuery(event)
  const mode = query['hub.mode'] ? query['hub.mode'] : null
  const challenge = query['hub.challenge'] ? query['hub.challenge'] : ''
  const token = query['hub.verify_token'] ? (query['hub.verify_token'] as string) : null

  if (mode === 'subscribe' && token) {
    if (token === config.stravaWebhook.verifyToken) {
      console.log('WEBHOOK_VERIFIED')
      return { 'hub.challenge': challenge }
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
        message: 'Wrong token',
      })
    }
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Missing or wrong parameters',
  })
})
