import {redirect} from "@sveltejs/kit";
import {getUserinfo} from "$lib/server/account.js";

export const load = async (serverLoadEvent) => {
    const response = await getUserinfo(serverLoadEvent);
    if (!response)
        throw redirect('/');
    return {
        user: response
    }
};
