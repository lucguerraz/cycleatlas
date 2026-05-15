export default defineEventHandler(async (event) => {
  await setUserSession(event, {
    user: {
      name: `Tadej Pogačar Pogi`,
      id: 6021015,
    },
    secure: {},
    loggedInAt: Date.now(),
  })

  return sendRedirect(event, '/')
})
