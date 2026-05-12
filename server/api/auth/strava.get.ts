export default defineOAuthStravaEventHandler({
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user: {
        name: `${user.firstname} ${user.lastname}`,
        id: user.id,
      },
      secure: {},
      loggedInAt: Date.now(),
    })

    const athlete = await AthleteSchema.findOne({ stravaid: user.id })

    if (athlete) {
      await AthleteSchema.updateOne(
        { stravaid: user.id },
        { access_token: tokens.access_token, expires_at: tokens.expires_at, refresh_token: tokens.refresh_token }
      )
    } else {
      await new AthleteSchema({
        stravaid: user.id,
        name: `${user.firstname} ${user.lastname}`,
        access_token: tokens.access_token,
        expires_at: tokens.expires_at,
        refresh_token: tokens.refresh_token,
      }).save()
    }

    return sendRedirect(event, '/')
  },
})
