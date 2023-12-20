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
                    goto('/controller');
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
        color: white;
        display: block;
        background-color: rgb(31 41 55);
        padding: 0.5em 1.5em 0.5em 1.5em;
        font-size: 1.3em;
        font-weight: bold;
        box-shadow: 2px 2px 2px black;
        border: 0.5em #e5e7eb;
        border-radius: 0.2em;
        margin: 1em;
    }

    .request-info {
        display: inline-block;
        margin-right: 5em;
    }

    .choice-button {
        padding: 0.3em 1.2em 0.3em 1.2em;
        border-radius: 0.2em;
    }

    .accept-request {
        background-color: green;
        margin-right: 0.5em;
    }

    .deny-button {
        background-color: red;
    }
</style>
