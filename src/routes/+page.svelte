<script lang="ts">
    import { listGuests } from "../lib/api/guests.js"

    const guests = await listGuests()
</script>

<svelte:head>
    <title>Guests | Guestbook</title>
    <meta name="description" content="Keep a simple, personal record of your guests." />
</svelte:head>

<section class="hero">
    <div>
        <p class="hero-kicker">Your guest register</p>
        <h1>Keep good company close.</h1>
        <p class="hero-copy">A tidy place for the names and details you don’t want to lose.</p>
    </div>
</section>

<section class="directory" aria-labelledby="directory-heading">
    <div class="directory-heading">
        <div>
            <h2 id="directory-heading">Guest directory</h2>
            <p>{guests.length ? "Select a guest to view or update their details." : "Names you add will appear here."}</p>
        </div>
    </div>

    {#if guests.length}
        <div class="guest-list">
            {#each guests as guest (guest.id)}
                <a class="guest-row" href="/{guest.id}">
                    <span class="avatar" aria-hidden="true">{guest.name.trim().charAt(0).toUpperCase()}</span>
                    <span class="guest-info">
                        <strong>{guest.name}</strong>
                        <span>{guest.email}</span>
                    </span>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </a>
            {/each}
            <a class="add-guest-row" href="/add-guest">
                <span class="add-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" /></svg>
                </span>
                <strong>Add guest</strong>
            </a>
        </div>
    {:else}
        <div class="empty-state">
            <span class="empty-icon" aria-hidden="true">+</span>
            <h3>Your guestbook is ready</h3>
            <p>Add the first person you want to keep close.</p>
            <a class="primary-button empty-action" href="/add-guest">Add your first guest</a>
        </div>
    {/if}
</section>

<style>
    .hero {
        min-height: 18rem;
        display: flex;
        align-items: flex-end;
        padding: clamp(2rem, 6vw, 4.5rem);
        background: linear-gradient(135deg, #f8f9ff 0%, #eef2ff 100%);
        border-bottom: 1px solid var(--line);
    }

    .hero-kicker {
        margin: 0 0 0.65rem;
        color: var(--blue);
        font-size: 0.85rem;
        font-weight: 750;
    }

    h1 {
        max-width: 12ch;
        margin: 0;
        font-size: clamp(2.4rem, 7vw, 4.8rem);
        font-weight: 790;
        letter-spacing: -0.065em;
        line-height: 0.98;
    }

    .hero-copy {
        max-width: 31rem;
        margin: 1.15rem 0 0;
        color: var(--muted);
        font-size: 1.02rem;
    }

    .directory {
        padding: clamp(1.5rem, 5vw, 3.25rem) clamp(1.25rem, 6vw, 4.5rem);
    }

    .directory-heading {
        margin-bottom: 1.35rem;
    }

    h2 {
        margin: 0;
        font-size: 1.25rem;
        letter-spacing: -0.025em;
    }

    .directory-heading p {
        margin: 0.25rem 0 0;
        color: var(--muted);
        font-size: 0.9rem;
    }

    .guest-list {
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 1rem;
    }

    .guest-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 0.95rem;
        min-height: 5rem;
        padding: 0.8rem 1rem;
        text-decoration: none;
        transition: background 150ms ease;
    }

    .guest-row + .guest-row {
        border-top: 1px solid var(--line);
    }

    .guest-row:hover {
        background: var(--wash);
    }

    .guest-row > svg {
        width: 1.15rem;
        color: var(--faint);
    }

    .add-guest-row {
        display: flex;
        min-height: 4.5rem;
        align-items: center;
        gap: 0.9rem;
        border-top: 1px solid var(--line);
        padding: 0.75rem 1rem;
        color: var(--blue);
        text-decoration: none;
        transition: background 150ms ease;
    }

    .add-guest-row:hover {
        background: var(--blue-soft);
    }

    .add-icon {
        display: grid;
        width: 2.8rem;
        height: 2.8rem;
        flex: 0 0 auto;
        place-items: center;
        border: 1px dashed #aebdf5;
        border-radius: 0.85rem;
        background: var(--blue-soft);
    }

    .add-icon svg {
        width: 1.15rem;
    }

    .add-guest-row strong {
        font-size: 0.95rem;
    }

    .avatar {
        display: grid;
        width: 2.8rem;
        height: 2.8rem;
        place-items: center;
        border-radius: 0.85rem;
        background: var(--blue-soft);
        color: var(--blue);
        font-weight: 780;
    }

    .guest-info {
        display: grid;
        min-width: 0;
    }

    .guest-info strong {
        overflow: hidden;
        font-size: 0.98rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .guest-info span {
        overflow: hidden;
        color: var(--muted);
        font-size: 0.86rem;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .empty-state {
        display: grid;
        min-height: 13rem;
        place-content: center;
        justify-items: center;
        border: 1px dashed #cbd3e5;
        border-radius: 1rem;
        background: var(--wash);
        text-align: center;
    }

    .empty-icon {
        display: grid;
        width: 2.7rem;
        height: 2.7rem;
        margin-bottom: 0.8rem;
        place-items: center;
        border-radius: 50%;
        background: var(--blue-soft);
        color: var(--blue);
        font-size: 1.5rem;
    }

    .empty-state h3,
    .empty-state p {
        margin: 0;
    }

    .empty-state p {
        margin-top: 0.25rem;
        color: var(--muted);
        font-size: 0.9rem;
    }

    .empty-action {
        margin-top: 1.25rem;
        text-decoration: none;
    }

    @media (max-width: 700px) {
        .hero {
            min-height: auto;
            align-items: flex-start;
            padding-block: 2.5rem;
        }
    }
</style>
