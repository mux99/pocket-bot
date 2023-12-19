<script>
    export let username;
    import { navigate } from 'svelte-routing';

    function redirectToAskPartPage() {
        navigate('/parts/new');
        window.location.reload();
    }
</script>

<style>
    #global {
        border: 1px;
        border-radius: 4px;
        background-color: #1F2937;
        margin: 10px;
        height: 110px;
    }
    #global:hover {
        background-color: #334155;
    }
    #name {
        color: #9CA3AF;
        padding: 10px;
    }
    #button {
        border-radius: 4px;
        color: white;
        font-weight: bold;
        padding: 10px;
        background-color: #166534;
        margin: 10px 10px 10px 10px;
        text-align: center;
    }
</style>

<div id="global">
    <div id="name">
        {username}
    </div>

    <div id="button">
        <button on:click={redirectToAskPartPage}>Ask part</button>
    </div>
</div>