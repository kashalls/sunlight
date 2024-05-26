import { z } from 'zod'

export const Codes = {
    Event: 0,
    Hello: 1,
    Initialize: 2,
    Heartbeat: 3
}

const DOMAIN_REGEX = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,63}$/;

export const Types = [
    "PUPPETEER",
    "IPERF",
    "OPENSPEEDTEST",
    // Might add speedtest ookla, looks like they require a real company + website.
    "CUSTOM"
] as const


export const DefaultOptions = z.object({
    id: z.string().uuid(),
    task: z.enum(Types).default('CUSTOM'),
    timings: z.object({
        dns: z.boolean().default(false),
        tcp: z.boolean().default(false),
        tls: z.boolean().default(false),
        ttfb: z.boolean().default(false),
        transfer: z.boolean().default(false)
    }),
    timestamp: z.boolean().default(true)
})

export const HttpOptions = DefaultOptions.extend({
    host: z.union([
        z.string().ip({ version: "v4" }),
        z.string().ip({ version: 'v6' }),
        z.string().regex(DOMAIN_REGEX)
    ]),
    status: z.number().int().min(100).max(999),
    headers: z.boolean().default(false)
})

export const PuppeteerOptions = HttpOptions.extend({
    viewport: z.object({
        width: z.number().default(1080),
        height: z.number().default(1024)
    })
})

export const IPerfOptions = DefaultOptions.extend({
    host: z.union([
        z.string().ip({ version: "v4" }),
        z.string().ip({ version: 'v6' }),
        z.string().regex(DOMAIN_REGEX)
    ]),
    port: z.number().min(10).max(65535).positive().default(5201),
    time: z.number().min(5).positive()
})
