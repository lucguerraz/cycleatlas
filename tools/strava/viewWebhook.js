import 'dotenv/config'

const main = async () => {
  const searchParams = new URLSearchParams({
    client_id: process.env.NUXT_OAUTH_STRAVA_CLIENT_ID,
    client_secret: process.env.NUXT_OAUTH_STRAVA_CLIENT_SECRET,
  })

  const res = await fetch(`https://www.strava.com/api/v3/push_subscriptions?${searchParams}`)

  const response = await res.text()

  console.log(`View Strava Webhook subscriptions`)
  console.log(`Response: HTTP ${res.status} – ${res.statusText}\n${response}`)
}

main()
