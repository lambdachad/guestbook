<script lang="ts">
    import { goto } from "$app/navigation"
    import { page } from "$app/state"
    import { deleteGuest, getGuest, updateGuest } from "../../lib/api/guests.js"

    // Guest
    let guest = $state(await getGuest(Number(page.params.id)))

    async function saveEdit(event: Event) {
        event.preventDefault()
        guest = await updateGuest(guest.id, { name: guest.name, email: guest.email })
    }

    async function removeGuest() {
        await deleteGuest(guest.id)
        goto("/")
    }
</script>

<a href="/">Back</a>
<h1>{guest.name}</h1>
<p>{guest.email}</p>

<form onsubmit={saveEdit}>
    <input placeholder="Name" bind:value={guest.name} required />
    <input type="email" placeholder="Email" bind:value={guest.email} required />
    <button type="submit">Save</button>
</form>

<button onclick={removeGuest}>Delete</button>
