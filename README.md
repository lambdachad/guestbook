# Guestbook

Native Android app written using SvelteKit, built as a static SPA and wrapped by Capacitor 8.

```bash
bun install          # install dependencies
bun dev              # dev server for on-device live reload (terminal 1)
bun android:dev      # deploy to phone with live reload (terminal 2)
bun android:build    # build, sync and sign a release APK via cap build
```

On the phone enable USB debugging, plug in, accept the RSA prompt, then
run `bun dev` in one terminal and `bun android:dev` in another: the phone loads the dev server
over USB and refreshes on every edit. To build a release APK, run `bun android:build`.

# Release

For client side (Android APK), run following to install in release mode:

```
bun android:build
adb install <path to apk>
```

For server side, run following to build and run in release mode:

```
bun run build
PORT=5173 bun build/server/index.js
```
