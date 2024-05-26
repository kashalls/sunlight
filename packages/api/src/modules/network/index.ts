import { db } from "@sunlight/db";
import { CustomHono } from "../../types/common";
import { createNetworkRouteConfig } from "./routes";
import { network } from "@sunlight/db/src/schema";

const networkRoutes = new CustomHono()

networkRoutes.openapi(createNetworkRouteConfig, async (c) => {
    const a = c.req.

    const data = await db.insert(network).values()

    return c.json({ success: true, data: {} })
})w

export default networkRoutes;
export type NetworkRoutes = typeof networkRoutes;