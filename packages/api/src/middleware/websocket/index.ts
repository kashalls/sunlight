
import { createBunWebSocket } from 'hono/bun'
const { upgradeWebSocket, websocket } = createBunWebSocket()

import {
    WebsocketHeartbeatInterval,
    Socket,
    parseAndValidateMessage
} from '@sunlight/utilities'

const honoWebsocket = upgradeWebSocket((c) => {
    let checkedIn: Boolean = false;
    let heartbeat: Timer;
    let seq = 1;
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
            const data = await parseAndValidateMessage(event.data, Socket.Response)
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

export default {
    BunWebsocket: websocket,
    SunlightWebsocket: honoWebsocket
}