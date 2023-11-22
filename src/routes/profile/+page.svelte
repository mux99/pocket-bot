<script>
    export let data;
</script>

<h2>Hello, {data.user.username}</h2>
<a href="/profile/modify">Edit my informations</a>

<form method="post" action="/profile">
    <button type="submit">Delete my account</button>
</form>
