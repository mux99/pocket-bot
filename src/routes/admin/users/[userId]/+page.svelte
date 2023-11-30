<script>
    export let data;
</script>

{#if data.user}
<div>
    <h2>User Data:</h2>
    <p>User ID: {data.user.user_id}</p>
    <p>Username: {data.user.username}</p>
    <!-- Add more properties as needed -->
</div>
{:else}
    <h1>404</h1>
    <p>User not found</p>
{/if}