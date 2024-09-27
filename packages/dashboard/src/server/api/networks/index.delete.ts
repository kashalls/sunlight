import { z } from 'zod'
import { network, inArray } from '@sunlight/db'

const networksDeleteSchema = z.object({
    items: z.array(z.number()).min(1)
})

export default defineEventHandler(async (event) => {
    const { items } = await getValidatedQuery(event, networksDeleteSchema.parse)

    const toDelete = inArray(network.id, items)

    try {
        await drizzle.delete(network).where(toDelete)

        const remaining = await drizzle.select().from(network).where(toDelete)
        const failed = remaining.map((row) => row.id)
        
        return { success: failed.length === 0, failed }

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }
})