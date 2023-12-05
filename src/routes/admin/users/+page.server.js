import {getUserRoles} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

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
        GROUP BY users.user_id
    `);

    return { users: rows }
}