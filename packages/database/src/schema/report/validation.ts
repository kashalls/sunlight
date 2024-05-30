import { z } from 'zod'
import { reportStatus } from './constants'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { report } from './report'

export const reportStatusSchema  = z.enum(reportStatus)

export const selectReportSchema = createSelectSchema(report)
export const insertReportSchema = createInsertSchema(report)

export type Report = z.infer<typeof selectReportSchema>
export type ReportStatus = z.infer<typeof reportStatusSchema>