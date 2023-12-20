<script>
    export let data;

    function goBack() {
        window.history.back();
    }
</script>

<style>
    h2 {
        color: #ddd;
        font-size: 24px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #888;
        padding: 8px;
        text-align: left;
        color: #ddd;
    }
    tr:nth-child(even) {
        background-color: #333;
    }
    th {
        background-color: #555;
        color: #ddd;
    }
</style>

<div class="max-w-lg mx-auto overflow-x-auto">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded" on:click={goBack}>Go back</button>
    <h2 class="text-lg text-white font-semibold mb-4 py-3">There are a total of <span class="bg-blue-500 text-white px-2 py-1 rounded">{ data.parts.length }</span> parts registered.</h2>
    <table class="w-full">
        <thead>
            <tr>
                <th>Part ID</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.parts as part (part.part_id)}
                <tr>
                    <td>{part.part_id}</td>
                    <td>{Math.floor(part.duration_ms / 60000)}m {((part.duration_ms % 60000) / 1000).toFixed(0)}s</td>
                    <td>{new Date(part.date).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                    <td>
                        <a href="/admin/parts/{part.part_id}" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">View / Edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>