import { createInsertSchema, createSelectSchema, } from 'drizzle-zod'
import { z } from 'zod'
import { network } from './network'

export const insertNetworkSchema = createInsertSchema(network)
export const selectNetworkSchema = createSelectSchema(network)

export type Network = z.infer<typeof selectNetworkSchema>