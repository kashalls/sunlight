import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { test } from "../tests";

export const device = pgTable('device', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    brand: varchar('brand', { length: 256 }).notNull(),
    image: varchar('image', { length: 2048 }),
    productLink: varchar('product_link', { length: 2048 })
})

export const deviceRelations = relations(device, ({ many }) => ({
    tests: many(test)
}))