<script>
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import { redirect } from '@sveltejs/kit';
    import Header from '$lib/components/Header.svelte';
    import { page } from "$app/stores";

    export let data;
    console.log(data)

    function showFooter() {
        if ($page.url.pathname === '/login' || $page.url.pathname === '/register')
            return false;
        if ($page.url.pathname === '/')
           return Object.keys(data).length;
        return true;
    }

    if ($page.url.pathname !== '/controller' && data.part)
        throw redirect(307, '/controller');
</script>

{#if data.user}
	<Header user={data.user} />
{/if}

<slot />

{#if showFooter()}
    <Footer />
{/if}
