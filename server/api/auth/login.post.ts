import { SignJWT } from 'jose'
import { Resend } from 'resend'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const resend = new Resend(config.resend.apikey)
  const body = await readBody<{ email?: string }>(event)

  const email = body?.email?.trim()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide a valid email address.',
    })
  }

  const athlete = await AthleteSchema.findOne({ email })

  if (!athlete) {
    if (!config.auth.allowlist.split(',').includes(email)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Your email is not allowed to signup.',
      })
    }

    const token = await new SignJWT({
      email,
      scope: ['complete-setup'],
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(config.auth.signingSecret))

    const link = config.auth.host + '/complete-setup?token=' + token

    const { error } = await resend.emails.send({
      from: config.resend.from,
      to: [email],
      subject: 'Complete your CycleAtlas account',
      html: `<p>Welcome to CycleAtlas</p><p>To continue, please complete your account by clicking on the link below.<br><a href="${link}">${link}</a></p><p>The link expires in one hour.</p>`,
    })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Unexpected server error. Please try again later.',
      })
    }

    return {
      msg: 'Check your email to complete your account.',
    }
  }

  const token = await new SignJWT({
    email,
    scope: ['verify'],
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(config.auth.signingSecret))

  const link = config.auth.host + '/verify?token=' + token

  const { error } = await resend.emails.send({
    from: config.resend.from,
    to: [email],
    subject: 'Login to CycleAtlas',
    html: `<p>Welcome back to CycleAtlas</p><p>To continue, please login by clicking on the link below.<br><a href="${link}">${link}</a></p><p>The link expires in one hour.</p>`,
  })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unexpected server error. Please try again later.',
    })
  }

  return {
    msg: 'Check your email for a login link.',
  }
})
