import {getUserRoles} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');

    const { rows } = await serverLoadEvent.locals.pool.query('SELECT * FROM users WHERE user_id = $1', [serverLoadEvent.params.userId]);

    return { user: rows[0] }
}