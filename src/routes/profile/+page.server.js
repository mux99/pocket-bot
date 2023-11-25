import {redirect} from "@sveltejs/kit";
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
  logout: async ({ locals, cookies }) => {
    await deleteDbSession(locals)
    await deleteBrowserSession(cookies)
    throw redirect(303, '/login');
  }
};
