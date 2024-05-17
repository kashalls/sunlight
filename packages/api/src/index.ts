import { Hono } from 'hono'
import { createBunWebSocket } from 'hono/bun'
import { jwt } from 'hono/jwt'
import { WebsocketHeartbeatInterval, WebsocketHello, WebsocketResponse } from '@sunlight/utilities'

import api from './api'

import { parseAndValidateMessage } from './util'

const { upgradeWebSocket, websocket } = createBunWebSocket()
const authentication = jwt({
  secret: 'this-is-a-test-secret-please-dont-push-me-k-thx-bye'
})

const app = new Hono()
// app.use('/v1', authentication)
app.route('/v1', api)

app.get('/healthz', (c) => {
  return c.text('ok')
})

app.get(
  '/ws',
  // Authentication works with websocket, needs Authorization: Bearer <key> . 
  authentication,
  upgradeWebSocket((c) => {
    const payload = c.get('jwtPayload')
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

        console.debug(JSON.stringify({ ...payload, data }))
        ws.send('Hello from server!')
      },
      onClose: () => {
        clearInterval(heartbeat)
        console.log('Connection closed')
      },
    }
  })
)

const port = 3000
export default {
  port,
  fetch: app.fetch,
  websocket
}
