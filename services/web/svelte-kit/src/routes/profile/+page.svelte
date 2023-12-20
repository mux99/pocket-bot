<script>
    export let data;
</script>

<style>
    .body{
        padding: 2em;
    }
    form {
        display: inline;
        padding: 0;
        background-color: var(--background-1);
    }
    form > button {background-color: var(--red);}
    form > button:hover {background-color: var(--red-hover);}
</style>

<div class="body">
    <h2>Hello, {data.user.username}</h2>
    <a class="am_a_button" href="/profile/modify">Edit my informations</a><br>

    <form method="post" action="/profile">
        <button type="submit">Delete my account</button>
    </form>
    <form action="?/logout" method="post">
        <button type="submit">logout</button>
    </form>
</div>
