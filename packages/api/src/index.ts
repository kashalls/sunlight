import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import { WebsocketHeartbeatInterval, WebsocketHello, WebsocketResponse } from '@sunlight/utilities'

import api from './api'

import { parseAndValidateMessage } from './util'

const { upgradeWebSocket, websocket } = createBunWebSocket()


const app = new Hono()
app.route('/v1', api)

app.get('/healthz', (c) => {
  return c.text('ok')
})

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    let checkedIn: Boolean = false;
    let heartbeat: Timer;
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
        return ws.send(JSON.stringify(WebsocketHello))
      },
      async onMessage(event, ws) {
        const data = await parseAndValidateMessage(event.data, WebsocketResponse)
        if (!data) return ws.close(1003, 'Invalid Message Data')

        if (data.op === 3) {
          checkedIn = true
          return;
        }

        console.debug(JSON.stringify({ data }))
        ws.send('Hello from server!')
      },
      onClose: () => {
        clearInterval(heartbeat)
        console.log('Connection closed')
      },
    }
  })
)

export default {
  port: process.env.PORT ?? 3000,
  fetch: app.fetch,
  websocket
}
