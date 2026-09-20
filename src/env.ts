import { networkInterfaces } from "node:os"
import { defineEnvVars } from "@sveltejs/kit/env"

function serverIP() {
    for (const interfaces of Object.values(networkInterfaces())) {
        for (const address of interfaces ?? []) {
            if (address.family === "IPv4" && !address.internal) return address.address
        }
    }
    return "localhost"
}

export const variables = defineEnvVars({
    DATABASE_URL: {
        description: "Path to the SQLite database file",
        schema: (value) => value ?? "guestbook.db",
    },
    API_URL: {
        public: true,
        description: "Base URL of the API, empty means same origin",
        schema: (value) => value ?? `http://${serverIP()}:5173`,
    },
})
