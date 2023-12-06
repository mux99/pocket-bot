<script>
    export let data;
    function goBack() {
        window.history.back();
    }

    function confirmDelete(event) {
        if (!confirm('Are you sure you want to delete this user?')) {
            event.preventDefault();
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    {#if data.user}
    <div class="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
        <form action="?/edit" method="POST" class="inline-block mr-2">
            <h2 class="text-2xl font-bold mb-4">User Data:</h2>
            <p class="mb-2"><span class="font-semibold">User ID:</span> {data.user.user_id}</p>
            <label for="username" class="font-semibold">Username:</label>
            <input id="username" name="username" type="text" class="border rounded px-2 py-1 mb-2 text-black" bind:value={data.user.username} />
            <p class="mt-4"><span class="font-semibold">Roles:</span>
                {#each data.user.roles as role (role)}
                    <span class="inline-block bg-blue-500 text-white px-2 py-1 rounded mr-2">{role}</span>
                {/each}
            </p>
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">Edit</button>
        </form>
        <div class="mt-4">
            <form action="?/delete" method="POST" on:submit={confirmDelete} class="inline-block mr-2">
                <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            </form>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={goBack}>Go back</button>
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