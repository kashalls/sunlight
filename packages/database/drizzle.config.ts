import "dotenv/config"

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'postgresql',
    schema: "./src/schema/index.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.POSTGRES_URL!
    },
})