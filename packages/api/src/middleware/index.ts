import { CustomHono } from "../types/common";
import { logger } from "./logger";
import { staticServe } from "./static";

import Websocket from './websocket'

const app = new CustomHono()

app.on('GET', ['/healthz', '/ping'], (c) => c.text('ok'))

// Logger
app.use('*', logger());

// Static Serve
app.use('/static/*', staticServe)

// Ray Websocket
app.all('/ws', Websocket.SunlightWebsocket)

export default app