<script>
    export let data;
    function goBack() {
        window.history.back();
    }
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
        <div class="mt-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={goBack}>Go back</button>
            <a href="/admin/users/{data.user.user_id}/edit" class="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</a>
            <a href="/admin/users/{data.user.user_id}/delete" class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</a>
        </div>
    </div>
    {:else}
        <div class="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full text-center">
            <h1 class="text-3xl font-bold mb-4">404</h1>
            <p>User not found</p>
            <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={goBack}>Go back</button>
        </div>
    {/if}
</div>