<form
        method="post"
        use:enhance={
            ({formData}) => {
                formData.append('default-username', data.user.username);
                formData.append('user_id', data.user.user_id);
            }
        }>
    <fieldset>
        <legend>Edit you informations</legend>
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

<script>
    import {enhance} from "$app/forms";
    export let data;
    export let form;
    let showPassword = false;
</script>

