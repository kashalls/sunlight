import { integer, json, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { testTypes } from "./constants";
import { node, nodesToTests } from "../nodes";
import { relations } from "drizzle-orm";
import { device } from "../devices";

export const typeEnum = pgEnum('type', testTypes)

export const test = pgTable('test', {
    id: serial('id').primaryKey(),
    deviceId: integer('device_id').notNull().references(() => device.id),

    type: typeEnum('type').notNull(),
    host: text('host').notNull(),
    port: integer('port').notNull(),
    options: json('options').notNull(),

    nodeId: integer('node_id').notNull().references(() => node.id),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    finishedAt: timestamp('finished_at').defaultNow().notNull()
})

export const testRelations = relations(test, ({ one, many }) => ({
    device: one(device, {
        fields: [test.id],
        references: [device.id]
    }),
    nodeTests: many(nodesToTests)
}))