import { getUserRoles } from '$lib/server/account.js';
import { redirect } from '@sveltejs/kit';


export async function load({locals}) {
    const roles = await getUserRoles(locals.userInfo.user_id);
    if (!roles.includes('admin'))
 	   throw redirect(307, '/');
}