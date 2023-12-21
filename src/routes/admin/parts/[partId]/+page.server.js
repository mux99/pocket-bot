import {getUserRoles} from "$lib/server/account.js";
import {pool} from "../../../../hooks.server.js";
import {redirect} from "@sveltejs/kit";
import {getPartInfo, updatePart, softDeletePart} from '$lib/server/parts.js';

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (!locals.userInfo)
        throw redirect(303, '/login');

    const roles = await getUserRoles(locals.userInfo.user_id);

    if (!roles.includes('admin'))
        throw redirect(303, '/');

    const rows = await getPartInfo(serverLoadEvent.params.partId);

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

        await updatePart(data.get('winner_id'), data.get('loser_id'), params.partId);

        throw redirect(303, '/admin/parts');
    }
}