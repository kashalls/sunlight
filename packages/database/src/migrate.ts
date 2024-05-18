import 'dotenv/config'

import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, client } from './database'

const run = async () => {
    await migrate(db, { migrationsFolder: './drizzle' })
    await client.end()
}