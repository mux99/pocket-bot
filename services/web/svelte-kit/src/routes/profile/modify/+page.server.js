import {fail, redirect} from "@sveltejs/kit";
import {apiUrl, pool} from "../../../hooks.server.js";
import * as argon2 from "argon2"
import {
    checkIfPasswordIsCorrect,
    checkIfUsernameExists,
    getUserinfo
} from "$lib/server/account.js";
import { existsSync } from "fs";

export const load = async (serverLoadEvent) => {
    const info = await getUserinfo(serverLoadEvent);
    if (!info)
        throw redirect('/');
    return {
        user: info,
        api_url: apiUrl,
        has_profile_picture: existsSync(`static/profile-picture/${info.user_id}.png`)
    }
};

export const actions = {
    default: async ({request, cookies, url}) => {
        const data = await request.formData();
        const defaultUsername = data.get("default-username");
        const userId = data.get("user_id");
        const oldPassword = data.get("old-password");
        const username = data.get("username");
        const password = data.get("password");
        const confirmPassword = data.get("confirm-password");
        const info = {};
        if (username && username !== defaultUsername) {
            if (await checkIfUsernameExists(username))
                return fail(400, {message: `The username ${username} already exists`});
            const messageUsername = checkUsername(username);
            if (messageUsername !== null)
                return fail(400, {message: messageUsername});
            info["username"] = username;
        }
        if (password) {
            if (password !== confirmPassword)
                return fail(400, {username, message: "The passwords aren't the same"});
            if (password === oldPassword)
                return fail(400, {username, message: "The password didn't change"})
            const messagePassword = checkPassword(password);
            if (messagePassword !== null)
                return fail(400, {username, message: messagePassword});
            if (! await checkIfPasswordIsCorrect(defaultUsername, oldPassword))
                return fail(400, {username, message: "The old password is invalid"});
            info["password"] = password;
        }
        if (Object.keys(info).length === 0)
            return fail(400, {username, message: "Nothing changed"});
        const message = await editUserInfo(userId, info);
        if (message === null)
            return {success: true, message: "Profil edited successfully"};
        return fail(400, username, message);
    }
};

function checkUsername(username) {
    if (username.length > 50)
        return "Username to long";
    if (username.length < 3)
        return "Username to short";
    return null;
}

function checkPassword(password) {
    if (password.length < 8)
        return "The password must have at least 8 chars";
    if (!/[A-Z]/.test(password))
        return  "The password must contains an uppercase letter";
    if (!/\d/.test(password))
        return  "The password must contains a digit";
    return null;
}

async function editUserInfo(userId, info) {
    if (info === undefined)
        return "Nothing changed";
    const toDo = [];

    if ('username' in info) {
        toDo.push(function () {updateUsername(userId, info.username)});
    }

    if ('password' in info) {
        toDo.push(function () {updatePassword(userId, info.password)});
    }

    if (toDo.length === 0)
        return "Nothing changed";
    toDo.forEach(method => method());
    return null;
}

async function updatePassword(id, password) {
    const hashedPassword = await argon2.hash(password);
    await pool.query({
        text: 'UPDATE users SET password=$1 WHERE user_id=$2',
        values: [hashedPassword, id]
    });
}

async function updateUsername(id, username) {
    pool.query({
        text: 'UPDATE users SET username=$1 WHERE user_id=$2',
        values: [username, id]
    });
}
