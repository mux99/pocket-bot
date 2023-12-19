<svelte:head>
    <title>Ask a new part</title>
</svelte:head>

<script>
    import {enhance} from "$app/forms";
    import {onDestroy, onMount} from "svelte";
    import {redirect} from "@sveltejs/kit";
    import PartAskedLoading from "$lib/components/PartAskedLoading.svelte";
    import {goto} from "$app/navigation";

    export let form;
    let eventSource;
    onMount(() => {
        const beforeUnloadHandler = (event) => {
            if (form !== null && form.success) {
                const confirmationMessage = `Are you sure to cancel your part with ${form.opponent} ?`;
                event.returnValue = confirmationMessage;
                stopServerSentEvent();
                return confirmationMessage;
            }
        };
        window.addEventListener('beforeunload', beforeUnloadHandler);

        eventSource = new EventSource('/parts/new/sse');
        if (!eventSource)
            throw redirect('/login');
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.accepted === null)return;
            eventSource.close();
            fetch('/parts/new/cancel');
            if (data.accepted) {
                alert(`${form.opponent} accepted your request !\nYou'll be redirected to the part page.`);
                goto('/');
            } else {
                alert(`${form.opponent} declined your request`);
                goto('/').then(() => goto('/parts/new'));
            }
        }
    });

    onDestroy(() => stopServerSentEvent());

    function stopServerSentEvent() {
        if (eventSource) {
            eventSource.close();
            fetch('/parts/new/cancel', {method: 'POST'});
        }
    }

    function cancelPart() {
        if (form === null || !form.success)return;
        form.message = `The part with ${form.opponent} was canceled !`
        delete form.opponent;
        form.success = false;
        fetch('/parts/new/cancel', {method: 'POST'});
        goto('/').then(() => goto('/parts/new'));
    }
</script>

<div style="text-align: center">
    {#if form === null || !form.success}
        <div id="form">
            <h2 id="title">Ask a new part :</h2>
            <form method="post" use:enhance>
                <label for="username">Opponent's username</label>
                <input type="text" id="username" name="username" placeholder="e.g. Robonator">
                <br>
                <button type="submit" id="send-invite-button">Send invite</button>
            </form>
            {#if form?.message}
                <p style="color: red">{form.message}</p>
            {/if}
        </div>
    {:else}
        <PartAskedLoading opponent="{form.opponent}" cancelPartFunction="{cancelPart}" style="opacity: {form?.success ? 1 : 0}"/>
    {/if}
</div>

<style>
    #form {
        padding: 1em;
        display: inline-block;
        background-color: rgb(31 41 55);
        color: white;
        font-size: 1.3em;
        box-shadow: 4px 4px 4px black;
        border-radius: 0.5em;
        margin: 5em 1em 1em 1em;
    }

    #title {
        font-weight: bold;
        font-size: 1.8em;
    }

    #username {
        background-color: rgb(17 24 39);
        border: rgb(55 65 81) 0.03em solid;
        border-radius: 0.1em;
        margin: 1em 0.5em 1em 0.5em;
    }

    #send-invite-button {

        padding: 0.5em 2em 0.5em 2em;
        border-radius: 0.5em;
        background-color: green;
        display: inline-block;
        margin: 1em 0 1em 0;
    }
</style>
