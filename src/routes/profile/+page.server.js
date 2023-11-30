import {redirect} from "@sveltejs/kit";
import {getUserinfo, softDeleteUser} from "$lib/server/account.js";
import {pool} from "../../hooks.server.js";

export const load = async (serverLoadEvent) => {
    const response = await getUserinfo(serverLoadEvent);
    if (!response)
        throw redirect('/');
    return {
        user: response
    }
};

export const actions = {
    default: async ({cookies}) => {
        if(await softDeleteUser(pool, cookies.get('uuid'))) {
            throw redirect(303, '/');
        }
    }
};