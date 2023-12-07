import {getUserRoles, generateUuid} from "$lib/server/account.js";
import {pool} from "../../../../hooks.server.js";
import {redirect} from "@sveltejs/kit";

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

        const { rows } = await serverLoadEvent.locals.pool.query(`
        SELECT users.*, array_agg(DISTINCT roles.name) as roles
        FROM users
        LEFT JOIN users_roles ON users.user_id = users_roles.user_id
        LEFT JOIN roles ON users_roles.role_id = roles.role_id
        WHERE users.user_id = $1
        GROUP BY users.user_id
    `, [serverLoadEvent.params.userId]);

    return { user: rows[0] }
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

        await pool.query({
            text: "UPDATE users SET username = $1 WHERE user_id = $2",
            values: [data.get('username'), params.userId]
        });

        throw redirect(303, '/admin/users');
    }
}