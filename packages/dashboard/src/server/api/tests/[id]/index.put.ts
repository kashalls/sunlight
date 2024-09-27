import { z } from 'zod'
import { test, insertTestSchema, eq } from '@sunlight/db'

const paramsSchema = z.object({
    id: z.number().positive()
})

const bodySchema = insertTestSchema.partial()

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
    const body = await readValidatedBody(event, bodySchema.parse)

    const [data] = await drizzle.update(test)
        .set({ ...body, updatedAt: new Date() })
        .where(eq(test.id, id))
        .returning()

    return { success: true, data }
})