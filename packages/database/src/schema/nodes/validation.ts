import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { discoveryTypes, interfaceTypes, statusTypes } from './constants';
import { node } from './node'

export const nodeInterfaceSchema = z.enum(interfaceTypes)
export const nodeStatusSchema = z.enum(statusTypes)
export const nodeDiscoverySchema = z.enum(discoveryTypes)

export const selectNodeSchema = createSelectSchema(node).extend({
    interface: z
        .enum(interfaceTypes)
        .nullable()
        .default("unknown")
        .transform((val) => val ?? "unknown"),
});
export const insertNodeSchema = createInsertSchema(node).extend({
    mac: z
        .array(z.string())
        .default([])
})

export type Node = z.infer<typeof selectNodeSchema>;
export type NodeInterface = z.infer<typeof nodeInterfaceSchema>;
export type NodeStatus = z.infer<typeof nodeStatusSchema>;
export type NodeDiscovery = z.infer<typeof nodeDiscoverySchema>;