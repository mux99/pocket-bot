<script>
    /** @type {import('./$types').PageData} */
    export let data;
    data = data.post;
    import FriendRequest from "$lib/components/FriendRequest.svelte";
</script>

<style>
    h1 {
        color: #9CA3AF;
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
        <div>You have no friends</div>
    </div>

    <div id="vl"></div>

    <div id="right">
        <h1>Requests</h1>
        <div>
            {#each data as {username}}
                <FriendRequest username={username}/>
            {/each}
        </div>
    </div>
</div>