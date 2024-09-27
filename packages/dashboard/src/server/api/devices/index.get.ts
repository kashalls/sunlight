import { count, ilike } from 'drizzle-orm'
import { z } from 'zod'
import { device } from '@sunlight/db'

const testsQuerySchema = z.object({
    query: z.string().optional(),
    offset: z.number().positive().default(0).optional(),
    limit: z.number().positive().default(50).optional(),
})

export default defineEventHandler(async (event) => {
    const { query, offset, limit } = await getValidatedQuery(event, testsQuerySchema.parse)

    const filter = query ? ilike(device.name, `%${query}%`) : undefined

    const [{ total }] = await drizzle.select({ total: count() }).from(device).where(filter)
    const data = await drizzle.select()
        .from(device)
        .offset(offset ?? 0)
        .limit(limit ?? 50)

    return {
        success: true,
        data,
        total
    }
})