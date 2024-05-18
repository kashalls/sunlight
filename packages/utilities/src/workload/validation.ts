import { z } from 'zod'

export const WorkloadTypes = [
    "PUPPETEER",
    "IPERF",
    "OPENSPEEDTEST",
    // Might add speedtest ookla, looks like they require a real company + website.
    "CUSTOM"
] as const

export const DOMAIN_REGEX = /^(?!:\/\/)([a-zA-Z0-9-_]{1,63}\.)+[a-zA-Z]{2,63}$/;

export const WorkloadRequestDefaultOptions = z.object({
    id: z.string().uuid(),
    host: z.union([
        z.string().ip({ version: "v4" }),
        z.string().ip({ version: 'v6' }),
        z.string().regex(DOMAIN_REGEX)
    ]),
    timings: z.object({
        dns: z.boolean().default(false),
        tcp: z.boolean().default(false),
        tls: z.boolean().default(false),
        ttfb: z.boolean().default(false),
        transfer: z.boolean().default(false)
    }),
    timestamp: z.boolean().default(true)
})

export const WorkloadRequestHttpOptions = WorkloadRequestDefaultOptions.extend({
    status: z.number(),
    headers: z.boolean().default(false)
})

export const PuppeteerOptions = WorkloadRequestHttpOptions.extend({
    page: z.string().url(),
})