import { z } from 'zod'

export * from './constants'

export * from './Event'
export * from './Hello'
export * from './Initialize'
export * from './Heartbeat'

export * from './ResponseSchema'

import { EventSchema } from "./Event";
import { HelloSchema } from "./Hello";
import { InitializeSchema } from "./Initialize";
import { HeartbeatSchema } from "./Heartbeat";

export const WebsocketResponse = z.union([
    EventSchema,
    HelloSchema,
    InitializeSchema,
    HeartbeatSchema
])
