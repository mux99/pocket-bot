import {getUserRoles} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";
import {getAllParts} from "../../../lib/server/parts.js";

export const load = async ({ locals }) => {
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');

    const rows = await getAllParts();

    return { parts: rows }
}
