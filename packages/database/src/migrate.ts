import 'dotenv/config'
import { consola } from 'consola'

import { Client } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import { env } from './env'

async function main() {
    consola.log('Creating migration client...')

    const client = new Client(env.DATABASE_URL)
    await client.connect()
        .catch((err) => {
            consola.error(`Failed to connect to database: ${err}`)
        })
    const db = drizzle(client)

    consola.log('Started database migrations...')

    await migrate(db, { migrationsFolder: 'drizzle' })

    consola.log('Finished database migrations...')

    process.exit(0)
}

main().catch((error) => {
    consola.error('Migration failed')
    consola.error(error)
    process.exit(1)
})
