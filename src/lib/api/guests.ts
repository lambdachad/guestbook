import { API_URL } from "$app/env/public"
import type { Guest, NewGuest } from "../database/schema.js"

export async function listGuests(): Promise<Guest[]> {
    const response = await fetch(`${API_URL}/api/guests`)
    if (!response.ok) throw new Error(`Listing guests failed: ${response.status}`)
    return response.json()
}

export async function getGuest(id: number): Promise<Guest> {
    const response = await fetch(`${API_URL}/api/guests/${id}`)
    if (!response.ok) throw new Error(`Reading guest failed: ${response.status}`)
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

export async function updateGuest(id: number, input: NewGuest): Promise<Guest> {
    const response = await fetch(`${API_URL}/api/guests/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
    })
    if (!response.ok) throw new Error(`Updating guest failed: ${response.status}`)
    return response.json()
}

export async function deleteGuest(id: number): Promise<Guest> {
    const response = await fetch(`${API_URL}/api/guests/${id}`, { method: "DELETE" })
    if (!response.ok) throw new Error(`Deleting guest failed: ${response.status}`)
    return response.json()
}
