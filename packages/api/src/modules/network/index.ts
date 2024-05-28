import { asc, count, db, desc, eq, ilike } from "@sunlight/db";
import { CustomHono } from "../../types/common";
import { createNetworkRouteConfig, getNetworksRouteConfig, deleteNetworksRouteConfig } from "./routes";
import { network } from "@sunlight/db/src/schema";
import { errorResponse } from "../../lib/errors";

const networkRoutes = new CustomHono()

networkRoutes.openapi(createNetworkRouteConfig, async (c) => {
    const { ssid, password } = c.req.valid('json')

    const [data] = await db
        .insert(network)
        .values({ ssid, password })
        .returning()
    
    return c.json({ success: true, data }, 200)
})

networkRoutes.openapi(getNetworksRouteConfig, async (c) => {
    const { q, sort, order, offset, limit } = c.req.valid('query')

    const filter = q ? ilike(network.ssid, `%${q}%`) : undefined

    const networksQuery = db.select().from(network).where(filter)

    const [{ total }] = await db.select({ total: count() }).from(networksQuery.as('networks'))
    
    const orderFunc = order === 'asc' ? asc : desc
    const networks = await db
        .select()
        .from(network)
        .orderBy(orderFunc(sort ? network[sort] : network.id))
        .limit(Number(limit))
        .offset(Number(offset))

    return c.json({
        success: true,
        data: {
            items: networks,
            total
        },
    }, 200)
    
})

networkRoutes.openapi(deleteNetworksRouteConfig, async (c) => {

    const query = c.req.valid('query')

    const data = await db.delete(network).where(eq(network.id, query.network))

    console.log(data)

    return c.json({
        success: true,
        errors: []
    }, 200)
})

export default networkRoutes;
export type NetworkRoutes = typeof networkRoutes;