import {redirect} from "@sveltejs/kit";
import {getPartsAskedByOtherUsers} from "$lib/server/parts.js";

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (!locals.userInfo)
        throw redirect(307, '/login');
    return {
        asked_part: await getPartsAskedByOtherUsers(locals.userInfo.user_id),
    };
};
