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
    /* 
    supprimer le cookie de la db
    supprimer le cookie du navigateur
    gérer les erreurs
    rediriger l'utilisateur vers la page /login
    */

    await deleteDbSession(locals, cookies)
    await deleteBrowserSession(locals, cookies)
    throw redirect(303, '/login');
  }
};
