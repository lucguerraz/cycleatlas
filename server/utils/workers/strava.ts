import { Athlete } from '~~/types'

const config = useRuntimeConfig()

export const fetchStrava = async (endpoint: string, athlete: Athlete): Promise<{ data: any; athlete: Athlete }> => {
  try {
    if (athlete.expires_at <= Date.now() / 1000) {
      console.warn(`AccessToken has expired, refreshing token first...`)
      const newAthlete = await refreshStravaToken(athlete)
      return fetchStrava(endpoint, newAthlete)
    }

    const res = await fetch(`https://www.strava.com/api/v3${endpoint}`, {
      headers: {
        Authorization: `Bearer ${athlete.access_token}`,
      },
    })

    if (res.status === 401) {
      console.warn(`401 received - refreshing token and retrying...`)
      const newAthlete = await refreshStravaToken(athlete)
      return fetchStrava(endpoint, newAthlete)
    }

    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After')
      const waitMs = retryAfter ? Math.max(0, parseInt(retryAfter, 10) * 1000) : 1000 // default to 1 s if header is missing

      console.warn(`429 received - waiting ${waitMs} ms before retrying...`)
      await new Promise((r) => setTimeout(r, waitMs))

      return fetchStrava(endpoint, athlete)
    }

    if (!res.ok) {
      const errBody = await res.text()
      throw new Error(`HTTP ${res.status} – ${res.statusText}\n${errBody}`)
    }

    return {
      data: await res.json(),
      athlete,
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch failed: ${error.message}`)
    }
    throw error
  }
}

const refreshStravaToken = async (athlete: Athlete) => {
  const res = await fetch(`https://www.strava.com/api/v3/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: config.oauth.strava.clientId,
      client_secret: config.oauth.strava.clientSecret,
      refresh_token: athlete.refresh_token,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`HTTP ${res.status} – ${res.statusText}\n${errBody}`)
  }

  const tokens = await res.json()

  const newAthlete = (await AthleteSchema.findOneAndUpdate(
    // @ts-ignore
    { stravaid: athlete.stravaid },
    { access_token: tokens.access_token, expires_at: tokens.expires_at, refresh_token: tokens.refresh_token },
    { returnDocument: 'after' }
  )) as unknown as Athlete

  return newAthlete
}
