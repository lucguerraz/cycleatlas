import 'dotenv/config'
import program from 'tailwind-config-viewer/node_modules/commander/index.js'

const main = async () => {
  program.requiredOption('--callback <string>')
  program.parse()
  const options = program.opts()

  const res = await fetch('https://www.strava.com/api/v3/push_subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.NUXT_OAUTH_STRAVA_CLIENT_ID,
      client_secret: process.env.NUXT_OAUTH_STRAVA_CLIENT_SECRET,
      callback_url: options.callback,
      verify_token: process.env.NUXT_STRAVA_WEBHOOK_VERIFY_TOKEN,
    }),
  })

  const response = await res.text()

  console.log(`Subscribing to Strava Webhook`)
  console.log(`Response: HTTP ${res.status} – ${res.statusText}\n${response}`)
}

main()
