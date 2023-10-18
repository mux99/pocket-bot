<script>
	export let form;
</script>

<form method="post">
	<label
		>username
		<input type="text" name="username" placeholder="username" required />
	</label>

	{#if form?.username}
		<p class="error">{form.username}</p>
	{/if}

	{#if form?.db}
		<p class="error">{form.db}</p>
	{/if}

	<label>
		password
		<input type="password" name="password" placeholder="password" required />
	</label>

	{#if form?.password}
		{#each form.password as passwordError}
			<p class="error">{passwordError}</p>
		{/each}
	{/if}

	<button>Register</button>
</form>
