<script>
    export let data;
</script>

<h2>Hello, {data.user.username}</h2>
<a href="/profile/modify">Edit my informations</a>

<form action="?/logout" method="post">
	<button type="submit">logout</button>
</form>
