<script>
    import {enhance} from "$app/forms";

    export let data;
    export let form;

    let files;
    let fileInput;
    let avatar;
    let avatarChangedSuccess = false;
    function getBase64(image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = e => {
            avatar = e.target.result;
            uploadProfilePicture(avatar);
        }
    }

    async function uploadProfilePicture(image) {
        const data = {};
        const imgData = image.split(',');
        data.image = imgData[1];
        await fetch('/profile/modify/picture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
              avatarChangedSuccess = data.status === 200;
          })
    }
    let isPasswordShown_1 = false;
    let isPasswordShown_2 = false;
    let isPasswordShown_3 = false;
	function showPassword_1() {isPasswordShown_1 = !isPasswordShown_1;}
    function showPassword_2() {isPasswordShown_2 = !isPasswordShown_2;}
    function showPassword_3() {isPasswordShown_3 = !isPasswordShown_3;}
</script>

<style>
    .body{
        text-align: center;
        padding: 2em;
    }
    .body > a {
        margin: 0 auto;
    }
    img {
        max-width: 5.5em;
        max-height: 5.5em;
        border: 3px var(--border-color) solid;
        border-radius: 1em;
    }
    form {
        width: fit-content;
    }
    svg {
		width: 100%;
		height: 100%;
	}
    .ok_button {background-color: var(--green);}
    .ok_button:hover {background-color: var(--green-hover);}
	.password_container {
		display: inline-flex;
		align-items: center;
	}
	.password_container > button {
		background-color: transparent;
		width: 2.2em;
		padding: 0;
	}
</style>

<div class="body">
    <form
    method="post"
    use:enhance={
        ({formData}) => {
            formData.append('default-username', data.user.username);
            formData.append('user_id', data.user.user_id);
        }
    }>
    <h2>Edit your avatar</h2>
    {#if avatar}
        <img id="avatar" src="{avatar}" alt="new {data.user.username}'s avatar"/>
    {:else}
        <img src={data.user.avatar} alt="{data.user.username}'s avatar" id='avatar' />
    {/if}
    <input
      class="hidden"
      type="file"
      accept=".jpg,.png"
      bind:this={fileInput}
      bind:files
      on:change={() => getBase64(files[0])}
    >
    <button on:click={() => fileInput.click()}>Upload</button>
    {#if avatarChangedSuccess}
        <p>You're profile picture changed successfully !</p>
    {/if}
    <h2>Edit your information's</h2>
    <label for="user-edit-username">Username</label>
    <input type="text" name="username" id="user-edit-username" value="{form?.username ?? data.user.username}">
    <br>
    <label for="user-old-password">Old password</label>
    <div class="password_container">
        <input type={isPasswordShown_1 ? "text" : "password"} name="old-password" id="user-old-password">
        <button type="button" class="text-white" on:click={showPassword_1}>
            {#if isPasswordShown_1}
                <!-- crossed eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
            {:else}
                <!-- eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {/if}
        </button>
    </div>
    <br>
    <label for="user-edit-password">New password</label>
    <div class="password_container">
        <input type={isPasswordShown_2 ? "text" : "password"} name="password" id="user-edit-password">
        <button type="button" class="text-white" on:click={showPassword_2}>
            {#if isPasswordShown_2}
                <!-- crossed eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
            {:else}
                <!-- eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {/if}
        </button>
    </div>
    <br>
    <label for="user-edit-confirm-password">Confirm new password</label>
    <div class="password_container">
        <input type={isPasswordShown_3 ? "text" : "password"} name="confirm-password" id="user-edit-confirm-password">
        <button type="button" class="text-white" on:click={showPassword_3}>
            {#if isPasswordShown_3}
                <!-- crossed eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
            {:else}
                <!-- eye icon -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {/if}
        </button>
    </div>
    <br>
    <button class="ok_button" type="submit">Confirm modifications</button>
</form>

<div>{form?.message || ''}</div><br>

<a href="/profile" class="am_a_button">Back to profile</a>
</div>