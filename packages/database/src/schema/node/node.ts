import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { interfaceTypes, statusTypes } from "./constants";

export const interfaceEnum = pgEnum('interface', interfaceTypes)
export const statusEnum = pgEnum('status', statusTypes)

export const node = pgTable(
    "node",
    {
        id: integer('id').primaryKey(),
        name: text('name').notNull(),
        description: text('description'),
        status: statusEnum('status').default('missing'),

        createdAt: timestamp('created_at').defaultNow(),
        updatedAt: timestamp('updated_at').defaultNow(),
        lastSeen: timestamp('last_seen').defaultNow(),

    }
)