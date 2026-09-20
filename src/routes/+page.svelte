<script lang="ts">
    import { LocalNotifications } from "@capacitor/local-notifications"
    import { createGuest, listGuests } from "../lib/api/guests.js"
    import type { Guest, NewGuest } from "../lib/database/schema.js"

    // Notifications
    let notifyWarning = $state<string>()
    try {
        const current = await LocalNotifications.checkPermissions()
        const display = current.display === "granted" ? "granted" : (await LocalNotifications.requestPermissions()).display
        if (display !== "granted") notifyWarning = `Notifications: ${display}`
    } catch (error) {
        notifyWarning = `Notifications unavailable: ${error}`
    }

    // Guest
    let guests = $state(await listGuests())
    let newGuest = $state<NewGuest>({ name: "", email: "" })

    async function addGuest(event: Event) {
        event.preventDefault()
        const guest = await createGuest({ name: newGuest.name, email: newGuest.email })
        newGuest = { name: "", email: "" }
        guests.push(guest)
        await LocalNotifications.schedule({
            notifications: [{ title: "New guest", body: `${guest.name} joined the guestbook`, id: Date.now() % 2147483647 }],
        })
    }
</script>

<h1>Guestbook</h1>
<form onsubmit={addGuest}>
    <input placeholder="Name" bind:value={newGuest.name} required />
    <input type="email" placeholder="Email" bind:value={newGuest.email} required />
    <button type="submit">Add guest</button>
</form>

{#if guests.length}
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {#each guests as guest (guest.id)}
                <tr>
                    <td>{guest.name}</td>
                    <td>{guest.email}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}

{#if notifyWarning}
    <p role="alert">{notifyWarning}</p>
{/if}
