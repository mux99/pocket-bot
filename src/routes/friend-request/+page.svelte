<script>
    export let form;
</script>

<form method="post">
    <label>
        friend
        <input type="text" name="username" placeholder="username" required />
    </label>

    {#if form?.receiver}
        <p class="error">{form.receiver}</p>
    {/if}

    {#if form?.request}
        <p class="error">{form.request}</p>
    {/if}

    <button>Send a friend request</button>
</form>
