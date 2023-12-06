import {redirect} from "@sveltejs/kit";
import {pool} from "../../hooks.server.js";
import {getUserinfo, deleteDbSession, deleteBrowserSession} from "$lib/server/account.js";

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
  logout: async ({ locals, cookies }) => {
    await deleteDbSession(locals)
    await deleteBrowserSession(cookies)
    throw redirect(303, '/login');
  }
};
