import {checkIfAdmin} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    if(!await checkIfAdmin(serverLoadEvent))
        throw redirect(308, '/');

    const { rows } = await serverLoadEvent.locals.pool.query('SELECT * FROM users ORDER BY user_id ASC');

    return { users: rows }
}