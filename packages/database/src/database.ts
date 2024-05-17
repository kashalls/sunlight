import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

const isPoolConnection = process.env.SUNLIGHT_DB_CONNECTION_TYPE?.toLocaleLowerCase() === 'pool'
const pgOptions = { connectionString: process.env.SUNLIGHT_DB_CONNECTION_STRING }

const client = isPoolConnection ? new Pool(pgOptions) : new Client(pgOptions);

await client.connect();
const db = drizzle(client);

export default db