import { eq } from "drizzle-orm"
import { db } from "../../../../lib/database/db.js"
import { guestsTable } from "../../../../lib/database/schema.js"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ params }) => {
    const guest = db
        .select()
        .from(guestsTable)
        .where(eq(guestsTable.id, Number(params.id)))
        .get()
    return Response.json(guest)
}

export const PATCH: RequestHandler = async ({ params, request }) => {
    const { name, email } = await request.json()
    const guest = db
        .update(guestsTable)
        .set({ name, email })
        .where(eq(guestsTable.id, Number(params.id)))
        .returning()
        .get()
    return Response.json(guest)
}

export const DELETE: RequestHandler = async ({ params }) => {
    const guest = db
        .delete(guestsTable)
        .where(eq(guestsTable.id, Number(params.id)))
        .returning()
        .get()
    return Response.json(guest)
}
