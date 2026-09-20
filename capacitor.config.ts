import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
    appId: "com.example.guestbook",
    appName: "guestbook",
    webDir: "build/client",
    server: {
        androidScheme: "http",
    },
}

export default config
