import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { interfaceTypes, statusTypes } from './constants';
import { node } from './node'

export const nodeInterfaceSchema = z.enum(interfaceTypes)
export const nodeStatusSchema = z.enum(statusTypes)

export const selectNodeSchema = createSelectSchema(node).extend({
    interface: z
        .enum(interfaceTypes)
        .nullable()
        .default("unknown")
        .transform((val) => val ?? "unknown"),
});

export type Node = z.infer<typeof selectNodeSchema>;
export type NodeInterface = z.infer<typeof nodeInterfaceSchema>;
export type NodeStatus = z.infer<typeof nodeStatusSchema>;