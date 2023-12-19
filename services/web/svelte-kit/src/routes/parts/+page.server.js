import {getArchiveParts, getUserinfo} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (!locals.userInfo)
        throw redirect(303, '/login');
    const user = {
        user_id: locals.userInfo.user_id
    };
    user.parts = await getArchiveParts(locals.userInfo.user_id);
    return {
        'user': user
    }
}