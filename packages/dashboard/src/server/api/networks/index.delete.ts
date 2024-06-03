import { z } from 'zod'
import { schema, inArray } from '@sunlight/db'

const networksDeleteSchema = z.object({
    items: z.array(z.number()).min(1)
})

export default defineEventHandler(async (event) => {
    const { items } = await getValidatedQuery(event, networksDeleteSchema.parse)

    const toDelete = inArray(schema.network.id, items)

    try {
        await drizzle.delete(schema.network).where(toDelete)

        const remaining = await drizzle.select().from(schema.network).where(toDelete)
        const failed = remaining.map((row) => row.id)
        
        return { success: failed.length === 0, failed }

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }
})