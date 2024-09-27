import { inArray } from 'drizzle-orm'
import { z } from 'zod'
import { test } from '@sunlight/db'

const testDeleteSchema = z.object({
    items: z.array(z.number()).min(1)
})

export default defineEventHandler(async (event) => {
    const { items } = await getValidatedQuery(event, testDeleteSchema.parse)

    const toDelete = inArray(test.id, items)

    try {
        await drizzle.delete(test).where(toDelete)

        const remaining = await drizzle.select().from(test).where(toDelete)
        const failed = remaining.map((row) => row.id)
        
        return { success: failed.length === 0, failed }

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }
})