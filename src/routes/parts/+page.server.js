import {getArchiveParts, getUserinfo} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    const user = await getUserinfo(serverLoadEvent);
    if (user == null)
        throw redirect(303, '/login');
    user["parts"] = await getArchiveParts(user["user_id"]);
    return {
        'user': user
    }
}