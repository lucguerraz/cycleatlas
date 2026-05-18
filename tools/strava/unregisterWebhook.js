import 'dotenv/config'
import program from 'tailwind-config-viewer/node_modules/commander/index.js'

const main = async () => {
  program.requiredOption('--id <number>')
  program.parse()
  const options = program.opts()

  const searchParams = new URLSearchParams({
    client_id: process.env.NUXT_OAUTH_STRAVA_CLIENT_ID,
    client_secret: process.env.NUXT_OAUTH_STRAVA_CLIENT_SECRET,
  })

  const res = await fetch(`https://www.strava.com/api/v3/push_subscriptions/${options.id}?${searchParams}`, {
    method: 'DELETE',
  })

  const response = await res.text()

  console.log(`Unsubscribing from Strava Webhook`)
  console.log(`Response: HTTP ${res.status} – ${res.statusText}\n${response}`)
}

main()
