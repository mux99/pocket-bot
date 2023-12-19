<script>
	import { enhance } from '$app/forms';
	export let form;
	let isPasswordShown = false;
	function showPassword() {
		isPasswordShown = !isPasswordShown;
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
					type={isPasswordShown ? 'text' : 'password'}
					name="password"
					placeholder="Password"
					required
					class="bg-background rounded-lg p-1 text-white flex-auto"
				/>

				<button type="button" class="text-white" on:click={showPassword}>
					{#if isPasswordShown}
						<!-- crossed eye icon -->
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
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					{:else}
						<!-- eye icon -->
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
					{/if}
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
