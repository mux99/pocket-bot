<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<style>
    .body {
        text-align: center;
        padding: 2em;
    }
</style>

<div class="body">
    <form method="post">
    <h1>Send friend request</h1>
    <label>
        <div>Friend's username</div>
        <div>
            <input type="text" name="username" placeholder="username" required>
        </div>
    </label>
    <button>Send friend request</button>
    {#if form?.message}
        {#if form?.success}
            <p>{form?.message}</p>
        {:else}
            <p>{form?.message}</p>
        {/if}
    {/if}
</div>