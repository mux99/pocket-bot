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
    <h2 class="text-lg text-white font-semibold mb-4 py-3">There are a total of <span class="bg-blue-500 text-white px-2 py-1 rounded">{ data.users.length }</span> users registered.</h2>
    <table class="w-full">
        <thead>
            <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Roles</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.users as user (user.user_id)}
                <tr>
                    <td>{user.user_id}</td>
                    <td>{user.username}</td>
                    <td>
                        {#each user.roles as role (role)}
                            <span class="inline-block bg-blue-500 text-white px-2 py-1 rounded mr-2">{role}</span>
                        {/each}
                    </td>
                    <td>
                        <a href="/admin/users/{user.user_id}" class="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">View / Edit</a>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>