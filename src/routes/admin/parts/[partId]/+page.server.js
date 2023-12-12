import {getUserRoles} from "$lib/server/account.js";
import {pool} from "../../../../hooks.server.js";
import {redirect} from "@sveltejs/kit";

async function softDeletePart(partId) {
    await pool.query({
		text: "UPDATE archive_parts SET deleted = true WHERE part_id = $1",
		values: [partId]
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
        SELECT archive_parts.part_id, archive_parts.duration_ms, archive_parts.date, winner_users.username as winner_username, loser_users.username as loser_username, winner_users.user_id as winner_user_id, loser_users.user_id as loser_user_id
        FROM archive_parts
        LEFT JOIN users AS winner_users ON archive_parts.winner = winner_users.user_id
        LEFT JOIN users AS loser_users ON archive_parts.loser = loser_users.user_id
        WHERE archive_parts.part_id = $1
    `, [serverLoadEvent.params.partId]);

    return { part: rows[0] }
}

export const actions = {
    delete: async (serverActionEvent) => {
        const {locals} = serverActionEvent;
        if (!locals.userInfo)
            throw redirect(303, '/login');

        const roles = await getUserRoles(locals.userInfo.user_id);

        if (!roles.includes('admin'))
            throw redirect(303, '/');

        await softDeletePart(serverActionEvent.params.partId);

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
            text: "UPDATE archive_parts SET winner = $1, loser = $2 WHERE part_id = $3",
            values: [data.get('winner_id'), data.get('loser_id'), params.partId]
        });

        throw redirect(303, '/admin/parts');
    }
}