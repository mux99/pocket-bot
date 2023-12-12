<script>
    export let data;
</script>

<style>
    h2 {
        color: #ddd; /* Light grey color for the heading */
        font-size: 24px;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid #888; /* Darker grey color for the border */
        padding: 8px;
        text-align: left;
        color: #ddd; /* Light grey color for the text */
    }
    tr:nth-child(even) {
        background-color: #333; /* Darker grey color for every other row */
    }
    th {
        background-color: #555; /* Even darker grey color for the table headers */
        color: #ddd; /* Light grey color for the header text */
    }
</style>

<div class="max-w-lg mx-auto overflow-x-auto">
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