import { inArray } from 'drizzle-orm'
import { z } from 'zod'
import { node } from '@sunlight/db'

const nodesDeleteSchema = z.object({
    items: z.array(z.number()).min(1)
})

export default defineEventHandler(async (event) => {
    const { items } = await getValidatedQuery(event, nodesDeleteSchema.parse)

    const toDelete = inArray(node.id, items)

    try {
        await drizzle.delete(node).where(toDelete)

        const remaining = await drizzle.select().from(node).where(toDelete)
        const failed = remaining.map((row) => row.id)
        
        return { success: failed.length === 0, failed }

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }
})