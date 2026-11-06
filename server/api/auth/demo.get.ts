export default defineEventHandler(async (event) => {
  await setUserSession(event, {
    user: {
      name: `Tadej Pogačar Pogi`,
      id: '6aee2217a513f28f0e849c69',
    },
    secure: {},
    loggedInAt: Date.now(),
  })

  return sendRedirect(event, '/')
})
