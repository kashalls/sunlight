import { z } from 'zod'

import { WebsocketState } from '../constants'
import { Codes, DefaultOptions, HttpOptions, PuppeteerOptions } from './constants'

export const Event = {
    op: Codes.Event
}
 
export const EventSchema = z.object({
    op: z.literal(Codes.Event),
    seq: z.number().positive(),
    t: z.enum(WebsocketState),
    d: z.union([
        DefaultOptions,
        HttpOptions,
        PuppeteerOptions,
    ])
})

