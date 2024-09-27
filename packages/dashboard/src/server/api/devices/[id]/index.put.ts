import { z } from 'zod'
import { device, insertDeviceSchema, eq } from '@sunlight/db'

const paramsSchema = z.object({
    id: z.number().positive()
})

const bodySchema = insertDeviceSchema.partial()

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
    const body = await readValidatedBody(event, bodySchema.parse)

    const [data] = await drizzle.update(device)
        .set(body)
        .where(eq(device.id, id))
        .returning()

    return { success: true, data }
})