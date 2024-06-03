import "dotenv/config"
import consola from "consola"

import { db } from "./db"
import { node } from "./schema"

const entries = [
    {
        schema: node,
        data: [
            {}
        ]
    }
]

async function main() {
    for (const entry of entries) {
        await db.insert(entry.schema).values(entry.data)
    }
    
    process.exit(0)
}

main().catch((error) => {
    consola.error('Seeding database failed...')
    consola.error(error)
    process.exit(1)
})