import { relations } from "drizzle-orm";

import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { node } from "../node";
import { device } from "../devices";

export const reportStatus = [
    "stuck",
    "progressing",
    "completed",
    "starting"
] as const;

const reportStatusEnum = pgEnum('status', reportStatus)

export const report = pgTable('report', {
    id: integer('id').primaryKey(),
    deviceId: integer('device_id').notNull().references(() => device.id),
    status: reportStatusEnum('status').notNull(),
    title: text('title').notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})

export const reportRelation = relations(report, ({ one }) => ({
    device: one(device, {
        fields: [report.deviceId],
        references: [device.id]
    })
}))