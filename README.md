# Guestbook

Native Android app written using SvelteKit, built as a static SPA and wrapped by Capacitor 8.

```bash
bun install          # install dependencies
bun dev              # dev server for on-device live reload (terminal 1)
bun android:dev      # deploy to phone with live reload (terminal 2)
bun android:install  # build and install the debug APK on the connected phone
```

On the phone enable USB debugging, plug in, accept the RSA prompt, then
`bun android:install`. For live reload run `bun dev` in one terminal
and `bun android:dev` in another: the phone loads the dev server
over USB and refreshes on every edit.
