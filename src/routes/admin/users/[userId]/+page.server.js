import {getUserRoles, generateUuid} from "$lib/server/account.js";
import {pool} from "../../../../hooks.server.js";
import {redirect} from "@sveltejs/kit";
import {getUserInfo, updateUser} from "../../../../lib/server/users.js";

async function softDeleteUser(userId) {
	await pool.query({
		text: "DELETE FROM sessions WHERE user_id = $1",
		values: [userId]
	});

	await pool.query({
		text: "UPDATE users SET username = $1, deleted = true WHERE user_id = $2",
		values: [generateUuid(), userId]
	});

	return true;
}

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');

    const rows = await getUserInfo(serverLoadEvent.params.userId);

    return { user: rows }
}

export const actions = {
    delete: async (serverActionEvent) => {
        const {locals} = serverActionEvent;
        if (!locals.userInfo)
            throw redirect(303, '/login');

        const roles = await getUserRoles(locals.userInfo.user_id);

        if (!roles.includes('admin'))
            throw redirect(303, '/');

        await softDeleteUser(serverActionEvent.params.userId);

        throw redirect(303, '/admin/users');
    },
    edit: async ({locals, request, params}) => {
        if (!locals.userInfo)
            throw redirect(303, '/login');

        const roles = await getUserRoles(locals.userInfo.user_id);

        if (!roles.includes('admin'))
            throw redirect(303, '/');

        const data = await request.formData();

        await updateUser(data.get('username'), params.userId);

        throw redirect(303, '/admin/users');
    }
}