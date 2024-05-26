import 'dotenv/config'

import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db, client } from './database'

export const migratedb = async () => {
    await migrate(db, { migrationsFolder: './drizzle' })
    await client.end()
}
