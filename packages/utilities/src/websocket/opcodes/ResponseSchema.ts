import { z } from 'zod'
import { Codes, DefaultOptions, HttpOptions, PuppeteerOptions } from './constants'
import { WebsocketState, WebsocketHeartbeatInterval } from '../constants'

export const HeartbeatData = z.object({
    heartbeat_interval: z.number().positive().default(WebsocketHeartbeatInterval)
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
})