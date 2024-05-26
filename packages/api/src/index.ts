import { schedule } from 'node-cron'
import { migratedb } from '@sunlight/db'

import app from './server'
import websocket from './middleware/websocket'
import { removeOldLogs } from './cron/remove-old-logs'
import { env } from './env'

const main = async () => {
    schedule('0 0 * * *', removeOldLogs, { scheduled: true, timezone: 'UTC' })

    // Doesn't seem to want to use the actual drizzle folder in the package.
    // await migratedb()

    const server = Bun.serve({
        fetch: app.fetch,
        websocket: websocket.BunWebsocket,
        port: env.PORT
    })

    console.log(`Sunlight running on http://${server.hostname}:${server.port}`)
}

main().catch((error) => {
    console.error('Failed to start server.')
    console.error(error)
    process.exit(1)
})