import { DATABASE_URL } from "$app/env/private"
import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"
import { migrate } from "drizzle-orm/bun-sqlite/migrator"

const client = new Database(DATABASE_URL)
export const db = drizzle({ client })
migrate(db, { migrationsFolder: "drizzle" })
