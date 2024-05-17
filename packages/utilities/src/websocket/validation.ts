import { z } from 'zod'
import { WebsocketStates } from './constants'

export const WebsocketResponse = z.object({
    op: z.number(),
    seq: z.number().optional(),
    t: z.enum(WebsocketStates).optional(),
    d: z.object({}).optional()
})