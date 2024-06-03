import { z } from 'zod'
import { Codes, DefaultOptions, HttpOptions, PuppeteerOptions } from './constants'
import { WebsocketState, WebsocketHeartbeatInterval } from '../constants'

export const HeartbeatData = z.object({
    heartbeat_interval: z.literal(WebsocketHeartbeatInterval)
})

const DUnion = z.union([
    HeartbeatData,
    DefaultOptions,
    HttpOptions,
    PuppeteerOptions
])

export const Response = z.object({
    op: z.number().min(0).max(3),
    seq: z.number().positive().optional(),
    t: z.enum(WebsocketState).optional(),
    d: z.optional(DUnion)
}).refine((data) => {
    if (data.op === 1) {
        return HeartbeatData.safeParse(data.d).success
    }

    if (data.op === 3) {
        return data.d === undefined
    }

    return true
}, {
    message: "Invalid data for given op code",
    path: ["d"]
})