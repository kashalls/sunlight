import { z } from 'zod'

import { EventSchema } from "./Event";
import { HelloSchema } from "./Hello";
import { InitializeSchema } from "./Initialize";
import { HeartbeatSchema } from "./Heartbeat";

export enum Opcode {
    Event,
    Hello,
    Initialize,
    Heartbeat,
}

export const WebsocketResponse = z.union([
    EventSchema,
    HelloSchema,
    InitializeSchema,
    HeartbeatSchema
])