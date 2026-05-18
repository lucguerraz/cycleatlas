import type { NitroApp } from 'nitropack'
import { Server as Engine } from 'engine.io'
import { Server } from 'socket.io'
import { defineEventHandler } from 'h3'

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const engine = new Engine()
  const io = new Server()
  const ioUsers = new Map()

  io.bind(engine)

  io.on('connection', async (socket) => {
    const cookies = Object.fromEntries(
      (socket.request.headers.cookie || '').split(';').map((p) => p.trim().split('=', 2))
    )
    const user = ioUsers.get(cookies['nuxt-session'])

    socket.join(user.id + '')
  })

  nitroApp.router.use(
    '/socket.io/',
    defineEventHandler({
      async handler(event) {
        const { user } = await requireUserSession(event)

        const cookies = Object.fromEntries(
          (event.node.req.headers.cookie || '').split(';').map((p) => p.trim().split('=', 2))
        )
        ioUsers.set(cookies['nuxt-session'], user)

        engine.handleRequest(event.node.req, event.node.res)
        event._handled = true
      },
      websocket: {
        async open(peer) {
          // @ts-expect-error private method and property
          engine.prepare(peer._internal.nodeReq)
          // @ts-expect-error private method and property
          engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket)
        },
      },
    })
  )

  nitroApp.io = io
})
