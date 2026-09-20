import { asc } from "drizzle-orm"
import { db } from "../../../lib/database/db.js"
import { guestsTable } from "../../../lib/database/schema.js"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async () => {
    const guests = await db.select().from(guestsTable).orderBy(asc(guestsTable.id))
    return Response.json(guests)
}

export const POST: RequestHandler = async ({ request }) => {
    const { name, email } = await request.json()
    const guest = db.insert(guestsTable).values({ name, email }).returning().get()
    return Response.json(guest, { status: 201 })
}
