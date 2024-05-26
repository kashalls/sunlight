import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

import * as schema from './schema'

const isPoolConnection = process.env.POSTGRES_TYPE?.toLocaleLowerCase() === 'pool'
const pgOptions = { connectionString: process.env.POSTGRES_URL }

export const client = isPoolConnection ? new Pool(pgOptions) : new Client(pgOptions);

await client.connect();
export const db = drizzle(client, { schema });