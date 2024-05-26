import { z } from 'zod'
import { Codes } from './constants'
import { WebsocketHeartbeatInterval, WebsocketState } from '../constants'

// Client Send Only
export const Initialize = {
    op: Codes.Initialize,
    seq: 0,
    t: "INIT_STATE" as WebsocketState,
    d: {
        hostname: '',
        mac: []
    }
}

export const InitializeSchema = z.object({
    op: z.literal(Codes.Initialize),
    seq: z.number().positive(),
    t: z.enum(WebsocketState).default("INIT_STATE"),
    d: z.object({
        hostname: z.string(),
        mac: z.array(z.string()).default([])
    })
})