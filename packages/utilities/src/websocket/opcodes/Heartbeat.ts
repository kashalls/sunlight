import { z } from 'zod'
import { Codes } from './constants'

export const Heartbeat = {
    op: Codes.Heartbeat
}

export const HeartbeatSchema = z.object({
    op: z.literal(Codes.Heartbeat)
})