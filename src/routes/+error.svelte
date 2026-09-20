<script lang="ts">
    import { page } from "$app/state"
</script>

<div class="error">
    <p class="error-code">{page.status}</p>
    <h1>{page.status === 404 ? "Page not found" : "Something went wrong"}</h1>
    <p>{page.status === 404 ? "This page may have moved or the guest no longer exists." : "The guestbook couldn’t complete that request."}</p>
    <a class="primary-button" href="/">Back to guestbook</a>
</div>

<style>
    .error {
        display: grid;
        min-height: 32rem;
        place-content: center;
        justify-items: center;
        padding: 2rem;
        text-align: center;
    }

    .error-code {
        margin: 0 0 0.25rem;
        color: var(--blue);
        font-size: 4.5rem;
        font-weight: 800;
        letter-spacing: -0.07em;
        line-height: 1;
    }

    h1 {
        margin: 0;
        font-size: 1.8rem;
        letter-spacing: -0.04em;
    }

    p:not(.error-code) {
        max-width: 28rem;
        margin: 0.5rem 0 1.5rem;
        color: var(--muted);
    }

    a {
        text-decoration: none;
    }
</style>
