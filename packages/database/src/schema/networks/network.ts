import { relations } from "drizzle-orm";
import { text, integer, pgTable } from "drizzle-orm/pg-core";
import { node } from "../node";

export const network = pgTable('network', {
    id: integer('id').primaryKey(),
    ssid: text('ssid').notNull(),
    password: text('password'),
})

export const networkRelations = relations(network, ({ many }) => ({
    nodes: many(node)
}))