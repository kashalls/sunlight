import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core";

export const device = pgTable('device', {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    brand: varchar('brand', { length: 256 }).notNull(),
    image: varchar('image', { length: 2048 }),
    productLink: varchar('product_link', { length: 2048 })
})

