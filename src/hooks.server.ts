import type { Handle } from "@sveltejs/kit/hooks"

const headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, OPTIONS",
}

export const handle: Handle = async ({ event, resolve }) => {
    if (!event.url.pathname.startsWith("/api/")) return resolve(event)
    if (event.request.method === "OPTIONS") return new Response(null, { status: 204, headers })
    const response = await resolve(event)
    for (const [name, value] of Object.entries(headers)) response.headers.set(name, value)
    return response
}
