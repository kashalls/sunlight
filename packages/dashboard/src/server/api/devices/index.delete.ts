import { inArray } from 'drizzle-orm'
import { z } from 'zod'
import { device } from '@sunlight/db'

const deviceDeleteSchema = z.object({
    items: z.array(z.number()).min(1)
})

export default defineEventHandler(async (event) => {
    const { items } = await getValidatedQuery(event, deviceDeleteSchema.parse)

    const toDelete = inArray(device.id, items)

    try {
        await drizzle.delete(device).where(toDelete)

        const remaining = await drizzle.select().from(device).where(toDelete)
        const failed = remaining.map((row) => row.id)
        
        return { success: failed.length === 0, failed }

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }
})