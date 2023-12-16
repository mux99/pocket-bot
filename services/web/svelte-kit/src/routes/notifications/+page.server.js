import {redirect} from "@sveltejs/kit";
import {getNotificationsOf} from "$lib/server/notifications.js";

export async function load({locals}) {
    if (!locals.userInfo)
        throw redirect(307, '/login');
    const notifications = await getNotificationsOf(locals.userInfo.user_id);
    return {
        notifications
    };
}
