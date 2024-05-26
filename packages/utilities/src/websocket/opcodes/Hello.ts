import { z } from 'zod'
import { Codes } from './constants'
import { WebsocketHeartbeatInterval, WebsocketState } from '../constants'

export const Hello = {
    op: Codes.Hello,
    seq: 0,
    t: "INIT_STATE" as WebsocketState,
    d: {
        heartbeat_interval: WebsocketHeartbeatInterval
    }
}

export const HelloSchema = z.object({
    op: z.literal(Codes.Hello),
    seq: z.number().positive(),
    t: z.enum(WebsocketState).default('INIT_STATE'),
    d: z.object({
        heartbeat_interval: z.number().default(WebsocketHeartbeatInterval)
    })
})