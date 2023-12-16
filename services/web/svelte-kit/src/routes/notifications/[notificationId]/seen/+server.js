import {redirect} from "@sveltejs/kit";
import {isNotificationOwnedBy, markNotificationAsSeen} from "$lib/server/notifications.js";

export async function POST({locals, params}) {
    if (!locals.userInfo)
        throw redirect(307, '/login');
    const {notificationId} = params;
    if (!notificationId)
        throw redirect(307, '/notifications');
    if (!await isNotificationOwnedBy(locals.userInfo.user_id, notificationId))
        throw redirect(307, '/notifications');
    await markNotificationAsSeen(notificationId);
    return new Response();
}
