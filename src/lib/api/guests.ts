import { API_URL } from "$app/env/public"
import type { Guest, NewGuest } from "../database/schema.js"

export async function listGuests(): Promise<Guest[]> {
    const response = await fetch(`${API_URL}/api/guests`)
    if (!response.ok) throw new Error(`Listing guests failed: ${response.status}`)
    return response.json()
}

export async function createGuest(input: NewGuest): Promise<Guest> {
    const response = await fetch(`${API_URL}/api/guests`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
    })
    if (!response.ok) throw new Error(`Creating guest failed: ${response.status}`)
    return response.json()
}
