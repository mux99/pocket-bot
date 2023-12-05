<script>
    export let data;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    {#if data.user}
    <div class="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
        <h2 class="text-2xl font-bold mb-4">User Data:</h2>
        <p class="mb-2"><span class="font-semibold">User ID:</span> {data.user.user_id}</p>
        <p><span class="font-semibold">Username:</span> {data.user.username}</p>
        <p class="mt-4"><span class="font-semibold">Roles:</span>
            {#each data.user.roles as role (role)}
                <span class="inline-block bg-blue-500 text-white px-2 py-1 rounded mr-2">{role}</span>
            {/each}
        </p>
    </div>
    {:else}
        <div class="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full text-center">
            <h1 class="text-3xl font-bold mb-4">404</h1>
            <p>User not found</p>
        </div>
    {/if}
</div>