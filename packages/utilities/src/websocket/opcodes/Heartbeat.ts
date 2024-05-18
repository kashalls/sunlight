import { z } from 'zod'
import { Opcode } from './constants'

export const Heartbeat = {
    op: Opcode.Heartbeat
}

export const HeartbeatSchema = z.object({
    op: z.literal(Opcode.Heartbeat)
})