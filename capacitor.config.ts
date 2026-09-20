import type { CapacitorConfig } from "@capacitor/cli"
import { homedir } from "node:os"
import { join } from "node:path"

const config: CapacitorConfig = {
    appId: "com.example.guestbook",
    appName: "Guestbook",
    webDir: "build/client",
    server: {
        androidScheme: "http",
    },
    android: {
        buildOptions: {
            keystorePath: join(homedir(), ".android/debug.keystore"),
            keystorePassword: "android",
            keystoreAlias: "androiddebugkey",
            keystoreAliasPassword: "android",
            releaseType: "APK",
            signingType: "apksigner",
        },
    },
}

export default config
