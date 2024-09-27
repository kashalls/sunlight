import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

import { SCHEDULER_TYPES } from './Constants'

export const env = createEnv({
    server: {
        ENDPOINT_URL: z.string().min(1),
        RAY_SCHEDULER: z.enum(SCHEDULER_TYPES).default(SCHEDULER_TYPES[0])
    },
    runtimeEnv: process.env,
    skipValidation: true
})