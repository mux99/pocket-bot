<script>
    export let data;
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/stores"
    function checkLoginCookie() {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith('uuid=')) {
                return true;
            }
        }

        return false;
    }

    function showFooter() {
        if ($page.url.pathname === '/login' || $page.url.pathname === '/register')
            return false;
        if ($page.url.pathname === '/')
           return data.is_connected;
        return true;
    }
    console.log(data.is_connected);
</script>

<slot />

{#if showFooter()}
    <Footer />
{/if}
