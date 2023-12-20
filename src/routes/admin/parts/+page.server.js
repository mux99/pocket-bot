import {getUserRoles} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async ({ locals }) => {
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');

    const { rows } = await locals.pool.query(`
        SELECT part_id, duration_ms, date
        FROM archive_parts
        ORDER BY part_id ASC
    `);

    return { parts: rows }
}
