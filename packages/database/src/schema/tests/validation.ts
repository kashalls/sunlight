import { z } from 'zod'
import { testTypes } from './constants'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { test } from './test'

export const testTypeSchema  = z.enum(testTypes)

export const selectTestSchema = createSelectSchema(test)
export const insertTestSchema = createInsertSchema(test)

export type Test = z.infer<typeof selectTestSchema>
export type TestType = z.infer<typeof testTypeSchema>