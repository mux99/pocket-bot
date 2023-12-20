<script>
    import {goto} from "$app/navigation";

    export let part;

    function acceptRequest() {
        fetch(`/parts/requests/accept/${part.requester_id}`, {method: 'POST'})
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    alert(`The request of ${part.requester_username} was deleted`);
                    goto('/').then(() => goto('/parts/requests'));
                } else {
                    alert(`You'll be redirected to the part page to fight against ${part.requester_username}\nGood luck !`);
                    goto('/');
                }
            });
    }

    function denyRequest() {
        fetch(`/parts/requests/deny/${part.requester_id}`, {method: 'POST'});
        goto('/').then(() => goto('/parts/requests'));
    }
</script>

<div class="part-request">
    <p class="request-info"><i>{part.requester_username}</i> ask you to play a game</p>
    <button class="choice-button accept-request" on:click={acceptRequest}>Accept</button>
    <button class="choice-button deny-button" on:click={denyRequest}>Deny</button>
</div>

<style>
    .part-request {
        display: block;
        background-color: var(--background-2);
        padding: 0.5em 1.5em 0.5em 1.5em;
        font-weight: bold;
        box-shadow: 2px 2px 2px black;
        border: 1px #e5e7eb solid;
        border-radius: 0.2em;
        margin: 1em;
    }

    .request-info {
        display: inline-block;
        margin-right: 5em;
    }

    .accept-request {background-color: var(--green);}

    .deny-button {background-color: var(--green);}
</style>
