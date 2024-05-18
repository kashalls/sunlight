import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import { WebsocketHeartbeatInterval, Socket, parseAndValidateMessage } from '@sunlight/utilities'

import api from './api'
import { WebsocketResponse } from '@sunlight/utilities/src/websocket/opcodes'

const { upgradeWebSocket, websocket } = createBunWebSocket()

export const app = new Hono()
app.route('/v1', api)

app.get('/healthz', (c) => {
  return c.text('ok')
})

const wsApp = app.get(
  '/ws',
  upgradeWebSocket((c) => {
    let checkedIn: Boolean = false;
    let heartbeat: Timer;
    let seq = 0;
    return {
      onOpen(_, ws) {
        heartbeat = setInterval(() => {
          if (!checkedIn) {
            return ws.close(1001, 'Heartbeat Expired')
          }
          if (checkedIn) {
            checkedIn = false
          }
        }, WebsocketHeartbeatInterval + 2500)
        ws.send(JSON.stringify({ ...Socket.Hello, seq }))
        return seq++;
      },
      async onMessage(event, ws) {
        const data = await parseAndValidateMessage(event.data, WebsocketResponse)
        if (!data) return ws.close(1003, 'Invalid Message Data')

        if (data.op === 3) {
          checkedIn = true
          return;
        }

        console.debug(`Debug: ${JSON.stringify(data)}`)
      },
      onClose: () => {
        clearInterval(heartbeat)
        console.log('Connection closed')
      },
    }
  })
)

export type WebSocketApp = typeof wsApp
export default {
  port: process.env.PORT ?? 3000,
  fetch: app.fetch,
  websocket
}
