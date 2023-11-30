<script>
    export let data;
</script>

<table>
    <thead>
        <tr>
            <th>User ID</th>
            <th>Username</th>
        </tr>
    </thead>
    <tbody>
        {#each data.users as user (user.user_id)}
            <tr>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
            </tr>
        {/each}
    </tbody>
</table>