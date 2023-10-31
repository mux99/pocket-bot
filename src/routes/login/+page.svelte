<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h1>/ Login /</h1>

<form method="POST">
    <label>
        Username
        <input type="text" name="username" placeholder="username" required>
    </label>

    <label>
        Password
        <input type="password" name="password" placeholder="password" required>
    </label>

    <button>Login</button>

    {#if form?.success}
        <p>{form.success}</p>
    {/if}

    {#if form?.error}
        <p>{form.error}</p>
    {/if}
</form>