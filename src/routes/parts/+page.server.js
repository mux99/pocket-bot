import {getArchiveParts, getUserinfo} from "$lib/server/account.js";
import {redirect} from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    const user = await getUserinfo(serverLoadEvent);
    if (user == null)
        throw redirect(303, '/');
    user["parts"] = await getArchiveParts(user["user_id"]);
    console.log(user["parts"])
    return {
        'user': user
    }
}