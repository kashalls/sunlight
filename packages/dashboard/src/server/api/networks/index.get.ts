import { asc, count, desc, ilike } from 'drizzle-orm'
import { z } from 'zod'
import { network } from '@sunlight/db'

const nodesQuerySchema = z.object({
    query: z.string().optional(),
    order: z.enum(['asc', 'desc']).default('asc').optional(),
    offset: z.number().positive().default(0).optional(),
    limit: z.number().positive().default(50).optional(),
})

export default defineEventHandler(async (event) => {
    const { query, order, offset, limit } = await getValidatedQuery(event, nodesQuerySchema.parse)

    const filter = query ? ilike(network.ssid, `%${query}%`) : undefined

    const [{ total }] = await drizzle.select({ total: count() }).from(network).where(filter)

    const ordering = order === 'asc' ? asc : desc;
    const data = await drizzle.select()
        .from(network)
        .orderBy(ordering(network.ssid))
        .offset(offset ?? 0)
        .limit(limit ?? 50)

    return {
        data,
        total
    }
})