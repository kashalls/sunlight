import { relations } from "drizzle-orm";
import { text, pgTable, integer, timestamp } from "drizzle-orm/pg-core";
import { node } from "../nodes";

export const network = pgTable('network', {
    id: integer('id').primaryKey(),
    ssid: text('ssid').notNull(),
    password: text('password').default(''),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const networkRelations = relations(network, ({ many }) => ({
    nodes: many(node)
}))