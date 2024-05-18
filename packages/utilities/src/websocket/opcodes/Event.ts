import { z } from 'zod'
import { Opcode } from './constants'
import { WebsocketState } from '../constants'

export const Event = {
    op: Opcode.Event
}

export const EventSchema = z.object({
    op: z.literal(Opcode.Event),
    seq: z.number().positive(),
    t: z.enum(WebsocketState),
    d: z.object({ }).passthrough()
})