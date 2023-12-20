<script>
    export let userId;
    export let username;

    async function accept() {
        await fetch(`/friend-request/accept/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                userId
            })
        });
        window.location.reload();
    }

    async function decline() {
        await fetch(`/friend-request/decline/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                userId
            })
        });
        window.location.reload();
    }
</script>

<style>
    .request {
        margin: 0 1em 1em 1em;
        background-color: var(--background-2);
        border-radius: 1em;
        padding: 0 1em;

        display: flex;
        justify-content: space-between;
    }
    #name {padding-top: 0.6em;}

    .ok_button {background-color: var(--green);}
    .ok_button:hover {background-color: var(--green-hover);}

    .no_button {background-color: var(--red);}
    .no_button:hover {background-color: var(--red-hover);}
</style>

<div class="request">
    <span id="name">{username}</span>
    <span>
        <button class="ok_button" on:click={accept}>Accept</button>
        <button class="no_button" on:click={decline}>Decline</button>
    </span>
</div>