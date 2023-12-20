<script>
    export let data;
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/stores"

    function showFooter() {
        if ($page.url.pathname === '/login' || $page.url.pathname === '/register')
            return false;
        if ($page.url.pathname === '/')
           return data.is_connected;
        return true;
    }
</script>

<slot />

{#if showFooter()}
    <Footer />
{/if}
