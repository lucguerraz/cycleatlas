export default defineOAuthStravaEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        name: `${user.firstname} ${user.lastname}`,
        id: user.id,
      },
      secure: {},
      loggedInAt: Date.now(),
    })

    return sendRedirect(event, '/')
  },
})
