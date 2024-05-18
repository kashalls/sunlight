import { z } from 'zod'
import type { WSMessageReceive } from "hono/ws";
import { WebsocketHeartbeatInterval, WebsocketState } from './constants'
import { PuppeteerOptions, WorkloadRequestDefaultOptions, WorkloadRequestHttpOptions } from '../workload';

export const WebsocketInit = z.object({
    heartbeat_interval: z.number().default(WebsocketHeartbeatInterval)
})

const DataUnion = z.union([
    WorkloadRequestDefaultOptions,
    WorkloadRequestHttpOptions,
    PuppeteerOptions,
    WebsocketInit
])

export const WebsocketResponse = z.object({
    op: z.number(),
    seq: z.number().optional(),
    t: z.enum(WebsocketState).optional(),
    d: DataUnion.optional()
}).refine((data) => {
    return !(data.op === 3 && data.d !== undefined)
}, {
    message: 'Cannot send any data while doing a heartbeat.',
    path: ['d']
})

function safeJsonParse<T>(json: string): T | null {
    try {
        return JSON.parse(json) as T;
    } catch (e) {
        console.error('Failed to parse JSON string:', e);
        return null;
    }
}

export async function parseAndValidateMessage<T>(message: WSMessageReceive, schema: z.ZodType<T>): Promise<T | null> {
    let jsonString: string;

    if (typeof message === 'string') {
        jsonString = message;
    } else if (message instanceof Blob) {
        jsonString = await message.text(); // Convert Blob to string
    } else if (message instanceof ArrayBuffer || ArrayBuffer.isView(message)) {
        jsonString = new TextDecoder().decode(message); // Convert ArrayBufferLike to string
    } else {
        console.error('Unsupported message type');
        return null;
    }

    const parsed = safeJsonParse<unknown>(jsonString); // Parse the JSON string

    if (parsed === null) {
        console.error('Invalid JSON format');
        return null;
    }

    const validation = schema.safeParse(parsed); // Validate the parsed object

    if (validation.success) {
        return validation.data;
    } else {
        console.error('Validation errors:', validation.error.errors);
        return null;
    }
}