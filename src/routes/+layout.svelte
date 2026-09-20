<script lang="ts">
    import "../app.css"
    import { navigating } from "$app/state"

    let { children } = $props()
</script>

<div class:is-active={navigating.to} class="route-progress" aria-hidden="true"></div>

<div class="app-shell">
    <header class="site-header">
        <a class="brand" href="/" aria-label="Guestbook home">
            <span class="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M5 4.5h12a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2v-13Z" />
                    <path d="M8 4.5v15M11 9h5M11 13h5" />
                </svg>
            </span>
            Guestbook
        </a>
        <span class="header-note">A simple record of good company</span>
    </header>

    <main class="page-frame">
        <svelte:boundary>
            {@render children()}

            {#snippet pending()}
                <div class="loading-screen" aria-label="Loading guestbook">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-copy"></div>
                    <div class="skeleton skeleton-panel"></div>
                </div>
            {/snippet}

            {#snippet failed(_error, reset)}
                <section class="render-error">
                    <h1>Couldn’t load this page</h1>
                    <p>Check your connection and try again. Your guestbook data hasn’t been changed.</p>
                    <button class="primary-button" type="button" onclick={reset}>Try again</button>
                </section>
            {/snippet}
        </svelte:boundary>
    </main>
</div>
