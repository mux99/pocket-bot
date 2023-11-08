<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<form method="post">
    <label>
        friend
        <input type="text" name="username" placeholder="username" required />
    </label>

    <button>Send friend request</button>

    {#if form?.message}
        {#if form?.success}
            <p class="text-green-600">{form?.message}</p>
        {:else}
            <p class="text-red-600">{form?.message}</p>
        {/if}
    {/if}
</form>
