import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
    server: {
        // API
        PORT: z.string().optional().default('4000'),
        
        // Database
        POSTGRES_URL: z.string(),
        POSTGRES_TYPE: z.string().optional().default('client'),

    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true
})