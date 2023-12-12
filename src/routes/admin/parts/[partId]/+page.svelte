<script>
    export let data;
    function goBack() {
        window.history.back();
    }

    function confirmDelete(event) {
        if (!confirm('Are you sure you want to delete this part?')) {
            event.preventDefault();
        }
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    {#if data.part}
    <div class="bg-gray-800 p-6 rounded shadow-lg max-w-md w-full">
        <form action="?/edit" method="POST" class="inline-block mr-2">
            <h2 class="text-2xl font-bold mb-4">Part Data:</h2>
            <p class="mb-2"><span class="font-semibold">Part ID:</span> {data.part.part_id}</p>
            <p class="mb-2"><span class="font-semibold">Winner:</span> <a href="/admin/users/{data.part.winner_user_id}">{data.part.winner_username}</a></p>
            <p class="mb-2"><span class="font-semibold">Loser:</span> <a href="/admin/users/{data.part.loser_user_id}">{data.part.loser_username}</a></p>
            <p class="mb-2"><span class="font-semibold">Duration:</span> {Math.floor(data.part.duration_ms / 60000)}m {((data.part.duration_ms % 60000) / 1000).toFixed(0)}s</p>
            <p class="mb-2"><span class="font-semibold">Date:</span> {new Date(data.part.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
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