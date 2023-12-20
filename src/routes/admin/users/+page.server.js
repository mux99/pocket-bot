import {getUserRoles} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";
import {getUsers} from "../../../lib/server/users.js";

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');

    const rows = await getUsers();

    return { users: rows }
}