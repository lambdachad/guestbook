<script lang="ts">
    import { createGuest, listGuests } from "../lib/api/guests.js"
    import type { NewGuest } from "../lib/database/schema.js"

    // Guest
    let guests = $state(await listGuests())
    let newGuest = $state<NewGuest>({ name: "", email: "" })

    async function addGuest(event: Event) {
        event.preventDefault()
        const guest = await createGuest({ name: newGuest.name, email: newGuest.email })
        newGuest = { name: "", email: "" }
        guests.push(guest)
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
