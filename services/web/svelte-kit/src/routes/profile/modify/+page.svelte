<script>
    import {enhance} from "$app/forms";

    export let data;
    export let form;

    let showPassword = false;
    let files;
    let fileInput;
    let avatar;
    let avatarUrl = `/profile-picture/${data.user.user_id}.png`;
    const defaultAvatar = '/img/default_avatar.png';
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
</script>

<div>
    {#if avatar}
        <img id="avatar" src="{avatar}" alt="new {data.user.username}'s avatar"/>
    {:else}
        <img id="avatar" src={defaultAvatar} alt="{data.user.username}'s avatar" />
    {/if}
    <input
      id="hidden"
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
</div>

<form
        method="post"
        use:enhance={
            ({formData}) => {
                formData.append('default-username', data.user.username);
                formData.append('user_id', data.user.user_id);
            }
        }>
    <fieldset>
        <legend>Edit you information's</legend>
        <label for="user-edit-username">Username :</label>
        <input type="text" name="username" id="user-edit-username" value="{form?.username ?? data.user.username}">
        <br>
        <label for="user-old-password">Old password</label>
        <input type={showPassword ? "text" : "password"} name="old-password" id="user-old-password">
        <br>
        <label for="user-edit-password">New password</label>
        <input type={showPassword ? "text" : "password"} name="password" id="user-edit-password">
        <br>
        <label for="user-edit-confirm-password">Confirm new password</label>
        <input type={showPassword ? "text" : "password"} name="confirm-password" id="user-edit-confirm-password">
        <br>
        <label for="user-edit-show-password">Show passwords</label>
        <input type="checkbox" id="user-edit-show-password" bind:checked={showPassword}>
        <br><br>
        <button type="submit">Confirm modifications</button>
    </fieldset>
</form>

<div>{form?.message || ''}</div>
<br>

<a href="/profile">Back to profile</a>


<style>
    #avatar {
        max-width: 2em;
        max-height: 2em;
    }

    #hidden {
        display: none;
    }
</style>

