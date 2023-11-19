<script>
	import { enhance } from '$app/forms';
	export let form;
	let isPasswordShown = false
	function showPassword(){
		isPasswordShown = !isPasswordShown
	}


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
			<div class="flex gap-2">
				<input
					type="{isPasswordShown ? 'text' : 'password'}"
					name="password"
					placeholder="Password"
					required
					class="bg-background rounded-lg p-1 text-white flex-auto"
				/>
				<button type="button" class="text-white" on:click={showPassword}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</button>
			</div>
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
