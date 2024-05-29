import { relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, primaryKey, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { discoveryTypes, interfaceTypes, statusTypes } from "./constants";
import { network } from "../networks";
import { test } from "../tests";

export const interfaceEnum = pgEnum('interface', interfaceTypes)
export const statusEnum = pgEnum('status', statusTypes)
export const discoveryEnum = pgEnum('discovery', discoveryTypes)

export const node = pgTable(
    "node",
    {
        id: serial('id').primaryKey(),
        name: text('name').notNull(),
        description: text('description'),
        status: statusEnum('status').default('offline'),
        mac: text('mac').array().notNull().default(sql`'{}'::text[]`),
        discovery: discoveryEnum('discovery').default('other'),

        networkId: integer('network_id').references(() => network.id).notNull(),

        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
        lastSeen: timestamp('last_seen').defaultNow(),
    }
)

export const nodeTests = pgTable('node_tests', {
    nodeId: integer('node_id').notNull().references(() => node.id),
    testId: integer('test_id').notNull().references(() => test.id),
}, (t) => ({
    pk: primaryKey(t.nodeId, t.testId)
}))

export const nodeRelations = relations(node, ({ one, many }) => ({
    network: one(network, {
        fields: [node.networkId],
        references: [network.id]
    }),
    nodeTests: many(nodeTests),
}))

