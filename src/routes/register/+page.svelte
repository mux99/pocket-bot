<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="flex flex-col gap-14 my-14 mx-72">
	<p class="text-white font-semibold text-5xl w-2/3">
		Join the pocket bot community and start playing now.
	</p>

	<form
		method="post"
		class="bg-modal rounded-3xl flex flex-col gap-8 p-8 justify-center text-3xl"
		use:enhance
	>
		<div class="flex flex-col gap-2">
			<label for="username" class="text-white font-semibold">Username </label>
			<input
				type="text"
				name="username"
				placeholder="Username"
				required
				class="bg-background rounded-lg p-1 text-white"
			/>
		</div>

		{#if form?.username}
			<p class="text-red-600">{form.username}</p>
		{/if}

		{#if form?.db}
			<p class="text-red-600">{form.db}</p>
		{/if}

		<div class="flex flex-col gap-2">
			<label for="password" class="text-white font-semibold">Password </label>
			<input
				type="password"
				name="password"
				placeholder="Password"
				required
				class="bg-background rounded-lg p-1 text-white"
			/>
		</div>

		{#if form?.password}
			{#each form.password as passwordError}
				<p class="text-red-600">{passwordError}</p>
			{/each}
		{/if}

		<div class="text-right">
			<button class="text-white font-semibold bg-background m-auto rounded-lg p-1">Register</button>
		</div>
	</form>
</div>
