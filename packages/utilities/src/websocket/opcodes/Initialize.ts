import { z } from 'zod'
import { Opcode } from './constants'
import { WebsocketHeartbeatInterval, WebsocketState } from '../constants'

export const Initialize = {
    op: Opcode.Event,
    seq: 0,
    t: "INIT_STATE" as WebsocketState,
    d: {
        heartbeat_interval: WebsocketHeartbeatInterval
    }
}

export const InitializeSchema = z.object({
    op: z.literal(Opcode.Initialize),
    seq: z.number().positive(),
    t: z.enum(WebsocketState).default("INIT_STATE"),
    d: z.object({
        heartbeat_interval: z.number().default(WebsocketHeartbeatInterval)
    })
})