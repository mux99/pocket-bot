<script>
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<style>
    .body {
        background-color: var(--background-3);
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    form {
       width: fit-content;
       height: fit-content;
       align-self: center;
       margin: 1em auto 0 auto;
    }
    h1 {
        margin-top: 0;
    }
    form > button {
        width: 100%;
        margin-bottom: 0;
    }
    .red {color: var(--red);}
    .green{color: var(--green);}
    .btm_text{
        width: 100%;
        text-align: center;
        font-size: small;
    }
</style>

<div class="body">
    <div>
        <form method="POST">
            <h1>Login</h1>
            <label>
                <div>Username</div>
                <input type="text" name="username" placeholder="username" required>
            </label>
            <label>
                <div>Password</div>
                <input type="password" name="password" placeholder="password" required>
            </label><br>
            <button class="big_button">Login</button>
            <div>
                {#if form?.message}
                    {#if form?.success}
                        <p class="green">{form?.message}</p>
                    {:else}
                        <p class="red">{form?.message}</p>
                    {/if}
                {/if}
            </div>
        </form>
        <div class="btm_text">
            <span>Don't have an account?</span>
            <a href="/register"><div>Register</div></a>
        </div>
    </div>
</div>