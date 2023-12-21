<script>
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/stores";

    function showFooter() {
        if ($page.url.pathname === '/login' || $page.url.pathname === '/register')
            return false;
        if ($page.url.pathname === '/')
           return Object.keys(data).length;
        return true;
    }
    import { redirect } from '@sveltejs/kit';
    export let data;
    if ($page.url.pathname !== '/controller' && data.part)
        throw redirect(307, '/controller');
</script>

<slot />

{#if showFooter()}
    <Footer />
{/if}
