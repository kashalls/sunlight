import "dotenv/config"

import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

export default defineConfig({
    dialect: 'postgresql',
    schema: "./src/schema/index.ts",
    out: "./drizzle",
    dbCredentials: {
        url: env.DATABASE_URL
    },
})