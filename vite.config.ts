import bunAdapter from "@sveltejs/adapter-bun"
import staticAdapter from "@sveltejs/adapter-static"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                experimental: {
                    async: true,
                },
            },
            csrf: {
                trustedOrigins: ["*"],
            },
            adapter:
                process.env.TARGET === "server"
                    ? bunAdapter({ out: "build/server" })
                    : staticAdapter({
                          pages: "build/client",
                          assets: "build/client",
                          fallback: "index.html",
                      }),
        }),
    ],
    server: {
        port: 5173,
        strictPort: true,
        host: "0.0.0.0",
        watch: {
            ignored: ["**/android/**"],
        },
    },
    clearScreen: false,
})
