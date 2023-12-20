<script>
    /** @type {import('./$types').ActionData} */
    export let form;
    let isPasswordShown = false;
	function showPassword() {
		isPasswordShown = !isPasswordShown;
	}
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
    svg {
		width: 100%;
		height: 100%;
	}
	.password_container {
		display: flex;
		align-items: center;
	}
	.password_container > button {
		background-color: transparent;
		width: 2.2em;
		padding: 0;
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
                <div class="password_container">
                    <input type={isPasswordShown ? 'text' : 'password'} name="password" placeholder="password" required>
                    <button type="button" class="text-white" on:click={showPassword}>
                        {#if isPasswordShown}
                            <!-- crossed eye icon -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                        {:else}
                            <!-- eye icon -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        {/if}
                    </button>
                </div>
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