<script>
    /** @type {import('./$types').PageData} */
    export let data;
    let friends = data.friends;
    let requests = data.requests;
    import Friend from "$lib/components/Friend.svelte";
    import FriendRequest from "$lib/components/FriendRequest.svelte";
</script>

<style>
    h1 {
        color: #9CA3AF;
        margin: 10px;
        font-size: larger;
    }
    #global {
        display: flex;
        background-color: #111827;
    }
    #left {
        width: 50%;
    }
    #right {
        width: 50%;
    }
    #vl {
        width: 1px;
        background-color: #9CA3AF;
    }
</style>

<div id="global">
    <div id="left">
        <h1>Friends</h1>
        <div>
            {#if !friends}
                <p>No friends</p>
            {:else}
                {#each friends as {username}}
                    <Friend username={username}/>
                {/each}
            {/if}
        </div>
    </div>

    <div id="vl"></div>

    <div id="right">
        <h1>Requests</h1>
        <div>
            {#if !requests}
                <p>No requests</p>
            {:else}
                {#each requests as {sender_id, username}}
                    <FriendRequest userId={sender_id} username={username}/>
                {/each}
            {/if}
        </div>
    </div>
</div>