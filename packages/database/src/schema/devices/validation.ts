import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { device } from './device'

export const selectDeviceSchema = createSelectSchema(device)
export const insertDeviceSchema = createInsertSchema(device)

export type Device = z.infer<typeof selectDeviceSchema>