<script>
    export let username;
    import { navigate } from 'svelte-routing';

    function redirectToAskPartPage() {
        navigate('/parts/new');
        window.location.reload();
    }
</script>

<style>
    .friend {
        margin: 0 1em 1em 1em;
        background-color: var(--background-2);
        border-radius: 1em;
        padding: 0 1em;

        display: flex;
        justify-content: space-between;
    }
    #name {padding-top: 0.6em;}
</style>

<div class="friend">
    <span id="name">{username}</span>
    <button on:click={redirectToAskPartPage}>Ask part</button>
</div>