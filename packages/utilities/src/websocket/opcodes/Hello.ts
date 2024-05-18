import { z } from 'zod'
import { Opcode } from './constants'
import { WebsocketHeartbeatInterval, WebsocketState } from '../constants'

export const Hello = {
    op: Opcode.Hello,
    seq: 0,
    t: "INIT_STATE" as WebsocketState,
    d: {
        heartbeat_interval: WebsocketHeartbeatInterval
    }
}

export const HelloSchema = z.object({
    op: z.literal(Opcode.Hello),
    seq: z.number().positive(),
    t: z.enum(WebsocketState).default('INIT_STATE'),
    d: z.object({
        heartbeat_interval: z.number().default(WebsocketHeartbeatInterval)
    })
})