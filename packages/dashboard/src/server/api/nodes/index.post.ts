import { schema } from '@sunlight/db'

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, schema.insertNodeSchema.parse)

    try {
        const result = await drizzle.insert(schema.node).values(body).returning();

        if (result.length === 1) {
            return { success: true }
        } else {
            throw createError({
                statusCode: 400,
                statusMessage: 'Failed to insert new row for values.'
            })
        }
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message
        })
    }
})