<script lang="ts">
    import { goto } from "$app/navigation"
    import { createGuest } from "../../lib/api/guests.js"
    import type { NewGuest } from "../../lib/database/schema.js"

    let guest = $state<NewGuest>({ name: "", email: "" })
    let adding = $state(false)
    let error = $state<string>()

    async function addGuest(event: SubmitEvent) {
        event.preventDefault()
        adding = true
        error = undefined

        try {
            const createdGuest = await createGuest({ name: guest.name, email: guest.email })
            await goto(`/${createdGuest.id}`)
        } catch {
            error = "Couldn’t add this guest. Check the details and try again."
            adding = false
        }
    }
</script>

<svelte:head>
    <title>Add a guest | Guestbook</title>
    <meta name="description" content="Add someone new to your guestbook." />
</svelte:head>

<section class="add-hero">
    <a class="back-link" href="/">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6" /></svg>
        All guests
    </a>
    <p class="hero-kicker">A new page in your guestbook</p>
    <h1>Add someone new.</h1>
    <p class="hero-copy">Start with the essentials. You can update their details whenever you need to.</p>
</section>

<section class="form-section" aria-labelledby="guest-form-heading">
    <div class="section-heading">
        <h2 id="guest-form-heading">Guest details</h2>
        <p>Both fields are required.</p>
    </div>

    <form onsubmit={addGuest}>
        <div class="field">
            <label for="guest-name">Name</label>
            <input id="guest-name" autocomplete="name" placeholder="Ada Lovelace" bind:value={guest.name} disabled={adding} required />
        </div>
        <div class="field">
            <label for="guest-email">Email address</label>
            <input id="guest-email" type="email" autocomplete="email" placeholder="ada@example.com" bind:value={guest.email} disabled={adding} required />
        </div>

        {#if error}
            <p class="inline-message" role="alert">{error}</p>
        {/if}

        <div class="form-actions">
            <a class="secondary-button" href="/">Cancel</a>
            <button class="primary-button" type="submit" disabled={adding}>{adding ? "Adding…" : "Add guest"}</button>
        </div>
    </form>
</section>

<style>
    .add-hero {
        padding: clamp(1.5rem, 5vw, 3.5rem) clamp(1.25rem, 6vw, 4.5rem) clamp(2.5rem, 7vw, 4.5rem);
        background: linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%);
        border-bottom: 1px solid var(--line);
    }

    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        margin-bottom: clamp(2rem, 5vw, 3.5rem);
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

    .hero-kicker {
        margin: 0 0 0.65rem;
        color: var(--blue);
        font-size: 0.85rem;
        font-weight: 750;
    }

    h1 {
        max-width: 13ch;
        margin: 0;
        font-size: clamp(2.4rem, 7vw, 4.4rem);
        font-weight: 790;
        letter-spacing: -0.06em;
        line-height: 1;
    }

    .hero-copy {
        max-width: 34rem;
        margin: 1rem 0 0;
        color: var(--muted);
        font-size: 1rem;
    }

    .form-section {
        padding: clamp(1.75rem, 5vw, 3.5rem) clamp(1.25rem, 6vw, 4.5rem);
    }

    .section-heading {
        margin-bottom: 1.5rem;
    }

    h2 {
        margin: 0;
        font-size: 1.2rem;
        letter-spacing: -0.025em;
    }

    .section-heading p {
        margin: 0.25rem 0 0;
        color: var(--muted);
        font-size: 0.9rem;
    }

    form {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 1rem;
    }

    .inline-message,
    .form-actions {
        grid-column: 1 / -1;
    }

    .inline-message {
        margin-top: 0.25rem;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 0.5rem;
        border-top: 1px solid var(--line);
        padding-top: 1.5rem;
    }

    .secondary-button {
        text-decoration: none;
    }

    @media (max-width: 620px) {
        form {
            grid-template-columns: 1fr;
        }

        .inline-message,
        .form-actions {
            grid-column: auto;
        }

        .form-actions {
            align-items: stretch;
            flex-direction: column-reverse;
        }
    }
</style>
