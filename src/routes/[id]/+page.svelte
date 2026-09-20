<script lang="ts">
    import { goto } from "$app/navigation"
    import { page } from "$app/state"
    import { deleteGuest, getGuest, updateGuest } from "../../lib/api/guests.js"

    // Guest
    let guest = $state(await getGuest(Number(page.params.id)))
    let saving = $state(false)
    let deleting = $state(false)
    let error = $state<string>()

    async function saveEdit(event: Event) {
        event.preventDefault()
        saving = true
        error = undefined

        try {
            guest = await updateGuest(guest.id, { name: guest.name, email: guest.email })
        } catch {
            error = "Couldn't save changes. Please try again."
        } finally {
            saving = false
        }
    }

    async function removeGuest() {
        if (!confirm(`Remove ${guest.name} from the guestbook?`)) return
        deleting = true
        error = undefined

        try {
            await deleteGuest(guest.id)
            await goto("/")
        } catch {
            error = "Couldn't remove guest. Please try again."
            deleting = false
        }
    }
</script>

<svelte:head>
    <title>{guest.name} | Guestbook</title>
</svelte:head>

<section class="detail-hero">
    <a class="back-link" href="/">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" /></svg>
        All guests
    </a>
    <div class="identity">
        <span class="large-avatar" aria-hidden="true">{guest.name.trim().charAt(0).toUpperCase()}</span>
        <div>
            <p>Guest details</p>
            <h1>{guest.name}</h1>
            <a href={`mailto:${guest.email}`}>{guest.email}</a>
        </div>
    </div>
</section>

<section class="editor">
    <div class="section-heading">
        <h2>Edit details</h2>
        <p>Keep this guest’s contact information up to date.</p>
    </div>

    <form onsubmit={saveEdit}>
        <div class="field">
            <label for="edit-name">Name</label>
            <input id="edit-name" autocomplete="name" bind:value={guest.name} disabled={saving || deleting} required />
        </div>
        <div class="field">
            <label for="edit-email">Email address</label>
            <input id="edit-email" type="email" autocomplete="email" bind:value={guest.email} disabled={saving || deleting} required />
        </div>
        <div class="form-footer">
            {#if error}
                <p class="save-message message-error" role="alert">{error}</p>
            {/if}
            <button class="primary-button" type="submit" disabled={saving || deleting}>{saving ? "Saving…" : "Save changes"}</button>
        </div>
    </form>

    <div class="danger-zone">
        <div>
            <h2>Remove guest</h2>
            <p>This permanently removes this person from your guestbook.</p>
        </div>
        <button class="danger-button" type="button" onclick={removeGuest} disabled={saving || deleting}>{deleting ? "Removing…" : "Remove guest"}</button>
    </div>
</section>

<style>
    .detail-hero {
        padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1.25rem, 6vw, 4.5rem);
        background: linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%);
        border-bottom: 1px solid var(--line);
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-bottom: 3rem;
        color: var(--muted);
        font-size: 0.87rem;
        font-weight: 680;
        text-decoration: none;
    }

    .back-link:hover {
        color: var(--blue);
    }

    .back-link svg {
        width: 1rem;
    }

    .identity {
        display: flex;
        align-items: center;
        gap: 1.25rem;
    }

    .large-avatar {
        display: grid;
        width: clamp(4.5rem, 12vw, 6.5rem);
        height: clamp(4.5rem, 12vw, 6.5rem);
        flex: 0 0 auto;
        place-items: center;
        border-radius: 1.4rem;
        background: var(--blue);
        color: white;
        font-size: clamp(1.8rem, 5vw, 2.8rem);
        font-weight: 780;
        box-shadow: 0 14px 30px rgba(49, 91, 232, 0.24);
    }

    .identity p {
        margin: 0 0 0.2rem;
        color: var(--blue);
        font-size: 0.82rem;
        font-weight: 730;
    }

    h1 {
        margin: 0;
        font-size: clamp(2rem, 5vw, 3.6rem);
        letter-spacing: -0.055em;
        line-height: 1.05;
    }

    .identity a {
        display: inline-block;
        margin-top: 0.4rem;
        color: var(--muted);
        font-size: 0.95rem;
        text-decoration-color: #b9c0d1;
        text-underline-offset: 0.2rem;
    }

    .editor {
        padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1.25rem, 6vw, 4.5rem);
    }

    .section-heading {
        margin-bottom: 1.5rem;
    }

    h2 {
        margin: 0;
        font-size: 1.15rem;
        letter-spacing: -0.025em;
    }

    .section-heading p,
    .danger-zone p {
        margin: 0.25rem 0 0;
        color: var(--muted);
        font-size: 0.9rem;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .form-footer {
        display: flex;
        grid-column: 1 / -1;
        min-height: 3rem;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 0.25rem;
    }

    .save-message {
        margin: 0;
        color: #347050;
        font-size: 0.875rem;
        font-weight: 650;
    }

    .save-message.message-error {
        color: var(--danger);
    }

    .danger-zone {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        margin-top: 2.25rem;
        border-top: 1px solid var(--line);
        padding-top: 2rem;
    }

    @media (max-width: 620px) {
        .back-link {
            margin-bottom: 2rem;
        }

        form {
            grid-template-columns: 1fr;
        }

        .form-footer {
            grid-column: auto;
            align-items: stretch;
            flex-direction: column;
        }

        .save-message:empty {
            display: none;
        }

        .danger-zone {
            align-items: stretch;
            flex-direction: column;
        }
    }
</style>
