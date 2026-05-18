import type { RequestHeaders } from 'h3'
import crypto from 'crypto'

import queue from '#server/queues/processActivity'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const body = (await readRawBody(event)) || ''
  const headers = getHeaders(event)

  /**
   * Can't verify due to missing signing secret
   * @link https://communityhub.strava.com/developers-api-7/signature-verification-shared-signing-secret-13220
   */
  // if (!verifySignature(headers, body, config.stravaWebhook.signingSecret)) {
  //   throw createError({
  //     statusCode: 403,
  //     statusMessage: 'Forbidden',
  //     message: 'Wrong or missing signature',
  //   })
  // }

  const payload = JSON.parse(body)

  // temporary check based on subscription id
  if (payload.subscription_id != config.stravaWebhook.subscriptionId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  switch (payload.object_type) {
    case 'activity':
      await handleActivity(payload)
      break

    case 'athlete':
      await handleAthlete(payload)
      break
  }

  return null
})

const verifySignature = (headers: RequestHeaders, body: string, signing_secret: string) => {
  const header = headers['x-strava-signature']
  if (!header) return false

  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=', 2)))
  const timestamp = parts['t']
  const signature = parts['v1']

  if (!timestamp || !signature) return false

  if (Math.abs(Date.now() / 1000 - parseInt(timestamp)) > 300) return false

  const expected = crypto.createHmac('sha256', signing_secret).update(`${timestamp}.${body}`).digest('hex')

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

const handleActivity = async (event: any) => {
  switch (event.aspect_type) {
    case 'create':
      // process new activity
      await queue.add('processActivity', {
        athleteStravaId: event.owner_id,
        activityStravaId: event.object_id,
        stravaActivity: null,
      })
      break

    case 'update':
      // update activity
      if (event.updates.title) {
        await ActivitySchema.updateOne(
          { stravaid: event.object_id, athleteid: event.owner_id },
          { name: event.updates.title }
        )
      }

      if (event.updates.sport_type) {
        await ActivitySchema.updateOne(
          { stravaid: event.object_id, athleteid: event.owner_id },
          { sport_type: event.updates.sport_type }
        )
      }

      if (event.updates.type) {
        if (event.updates.type === 'ride') {
          // process it
          await queue.add('processActivity', {
            athleteStravaId: event.owner_id,
            activityStravaId: event.object_id,
            stravaActivity: null,
          })
        } else {
          // delete it
          await ActivitySchema.deleteOne({ stravaid: event.object_id, athleteid: event.owner_id })
        }
      }

      break

    case 'delete':
      // delete activity
      await ActivitySchema.deleteOne({ stravaid: event.object_id, athleteid: event.owner_id })
      break
  }
}

const handleAthlete = async (event: any) => {
  switch (event.aspect_type) {
    case 'update':
      if (event.updates?.authorized && event.updates.authorized === 'false') {
        // delete all athelete data
        await ActivitySchema.deleteMany({ athleteid: event.owner_id })
        await AthleteSchema.deleteOne({ stravaid: event.owner_id })
      }

      break
  }
}
