import { serveStatic } from "hono/bun";
import { env } from "../env";

export const staticServe = serveStatic({ path: env.STATIC_FILES })