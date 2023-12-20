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

<style>
    .body{text-align: center; padding-top: 5em;}
    .ok_button {background-color: var(--green);}
    .ok_button:hover {background-color: var(--green-hover);}
    p {color: var(--red);}
</style>

<div class="body">
    {#if form === null || !form.success}
        <form method="post" use:enhance>
            <h2>Ask a new part :</h2>
            <label for="username">Opponent's username</label>
            <input type="text" name="username" placeholder="e.g. Robonator">
            <br>
            <button type="submit" class="ok_button">Send invite</button>
        </form>
        {#if form?.message}
            <p>{form.message}</p>
        {/if}
    {:else}
        <PartAskedLoading opponent="{form.opponent}" cancelPartFunction="{cancelPart}" style="opacity: {form?.success ? 1 : 0}"/>
    {/if}
</div>
