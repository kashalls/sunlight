import { z } from 'zod'
import { node, insertNodeSchema, eq } from '@sunlight/db'

const paramsSchema = z.object({
    id: z.number().positive()
})

const bodySchema = insertNodeSchema.pick({
    name: true,
    description: true,
    status: true,
    mac: true,
    networkId: true
}).partial()


export default defineEventHandler(async (event) => {
    const { id } = await getValidatedRouterParams(event, paramsSchema.parse)
    const { name, description, status, mac, networkId } = await readValidatedBody(event, bodySchema.parse)

    const [data] = await drizzle.update(node)
        .set({ name, description, status, mac, networkId, updatedAt: new Date() })
        .where(eq(node.id, id))
        .returning()
    
    return { success: true, data }
})