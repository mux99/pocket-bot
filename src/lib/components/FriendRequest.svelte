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
    #accept {
        background-color: #166534;
        margin: 10px 5px 10px 10px;
    }
    #decline {
        background-color: #991B1B;
        margin: 10px 10px 10px 5px;
    }
    .button {
        border-radius: 4px;
        color: white;
        font-weight: bold;
        padding: 10px;
        width: 50%;
        text-align: center;
    }
    #choice {
        display: flex;
    }
</style>

<div id="global">
    <div id="name">
        {username}
    </div>

    <div id="choice">
        <div class="button" id="accept">
            <button on:click={accept}>Accept</button>
        </div>

        <div class="button" id="decline">
            <button on:click={decline}>Decline</button>
        </div>
    </div>
</div>