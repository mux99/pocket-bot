import {getUserRoles} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');
}