import { z } from 'zod'

import { network, insertNetworkSchema, eq } from '@sunlight/db'

const paramsSchema = z.object({
    id: z.number().positive()
})

const bodySchema = insertNetworkSchema.pick({
    ssid: true,
    password: true
}).partial()

export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
    const { ssid, password } = await readValidatedBody(event, bodySchema.parse)

    const [data] = await drizzle.update(network)
        .set({ ssid, password })
        .where(eq(network.id, id))
        .returning()

    return { success: true, data }
})