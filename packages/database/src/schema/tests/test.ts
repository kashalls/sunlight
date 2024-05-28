import { integer, json, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { testTypes } from "./constants";

const type = pgEnum('type', testTypes)

export const test = pgTable('test', {
    id: serial('id').primaryKey(),
    type: type('type').notNull(),
    host: text('host').notNull(),
    port: integer('port').notNull(),
    options: json('options').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    finishedAt: timestamp('finished_at').defaultNow().notNull()
})