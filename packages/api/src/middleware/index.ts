import { CustomHono } from "../types/common";
import { logger } from "./logger";

import Websocket from './websocket'

const app = new CustomHono()

app.on('GET', ['/healthz', '/ping'], (c) => c.text('ok'))

// Logger
app.use('*', logger());

// Ray Websocket
app.all('/ws', Websocket.SunlightWebsocket)

export default app