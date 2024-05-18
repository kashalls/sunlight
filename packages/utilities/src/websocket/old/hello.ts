import { WebsocketHeartbeatInterval } from './constants'
import type { WebsocketState } from './constants'

export const WebsocketHello = {
    op: 0,
    seq: 1,
    t: "INIT_STATE" as WebsocketState,
    d: {
        heartbeat_interval: WebsocketHeartbeatInterval
    }
}