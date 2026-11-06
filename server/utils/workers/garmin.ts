import { Athlete } from '~~/types'

export const fetchGarmin = async (
  endpoint: string,
  athlete: Athlete,
  asBuffer: boolean = false
): Promise<{ data: any; athlete: Athlete }> => {
  try {
    if (athlete.expires_at <= Date.now() / 1000) {
      console.warn(`Token has expired, refreshing token first...`)
      const newAthlete = await fetchGarminToken(athlete)
      return fetchGarmin(endpoint, newAthlete, asBuffer)
    }

    const res = await fetch(`https://personal.connectapi.garmin.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${athlete.token}`,
      },
    })

    if (res.status === 401) {
      console.warn(`401 received - refreshing token and retrying...`)
      const newAthlete = await fetchGarminToken(athlete)
      return fetchGarmin(endpoint, newAthlete, asBuffer)
    }

    if (res.status === 429) {
      const retryAfter = res.headers.get('Retry-After')
      const waitMs = retryAfter ? Math.max(0, parseInt(retryAfter, 10) * 1000) : 1000 // default to 1 s if header is missing

      console.warn(`429 received - waiting ${waitMs} ms before retrying...`)
      await new Promise((r) => setTimeout(r, waitMs))

      return fetchGarmin(endpoint, athlete, asBuffer)
    }

    if (!res.ok) {
      const errBody = await res.text()
      throw new Error(`HTTP ${res.status} - ${endpoint} - ${res.statusText}\n${errBody}`)
    }

    if (asBuffer) {
      if (!res.body) throw new Error('Response has no body')

      const chunks = []
      for await (const chunk of res.body) {
        chunks.push(Buffer.from(chunk))
      }

      return {
        data: Buffer.concat(chunks),
        athlete,
      }
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

const fetchGarminToken = async (athlete: Athlete): Promise<Athlete> => {
  const res = await fetch(
    `https://personal.connectapi.garmin.com/personalapitoken-service/personal-api/personal-api-key/token`,
    {
      method: 'POST',
      headers: { Authorization: `ApiKey ${athlete.apikey}` },
    }
  )

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`HTTP ${res.status} - ${res.statusText}\n${errBody}`)
  }

  const token = await res.text()
  const tokenContents = JSON.parse(Buffer.from(token.split('.')[1] || '', 'base64').toString())

  const newAthlete = (await AthleteSchema.findOneAndUpdate(
    { _id: athlete._id },
    { token, expires_at: tokenContents.exp },
    { returnDocument: 'after' }
  )) as Athlete

  return newAthlete
}
