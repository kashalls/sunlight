import { Hono } from "hono";
import { db, eq, like, or, schema } from '@sunlight/db'

const network = new Hono()

network.get('/', async (c) => {
    const count = Number(c.req.query('count')) ?? 25
    const start = Number(c.req.query('start')) ?? 0

    const networks = await db.select()
        .from(schema.network)
        .limit(count)
        .offset(start)
        .execute()

    return c.json({ success: true, data: { count, start, data: networks } })
})

network.get('/:id', async (c) => {
    const id = c.req.param('id')

    const networks = await db.select()
        .from(schema.node)
        .where(like(schema.node.name, `%${id}%`))
        .execute()
    
    return c.json(networks)
})

network.patch('/:id', async (c) => {
    const id = Number(c.req.param('id'))
    const body = await c.req.parseBody()

    const res = await db.update(schema.node)
        .set(body)
        .where(eq(schema.node.id, id))
        .returning()

    return c.json(res)
})

export default network