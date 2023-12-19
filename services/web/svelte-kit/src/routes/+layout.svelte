<script>
    import "../app.css";
    import Footer from "$lib/components/Footer.svelte";
    import { page } from "$app/stores"
    console.log($page.url.pathname);
</script>

<slot />

{#if $page.url.pathname !== '/controller'}
    <Footer />
{/if}