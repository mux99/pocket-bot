import {cancelPart} from "$lib/server/parts.js";
import { deletePartNotificationsOfSender } from '$lib/server/notifications.js';

export async function POST({locals}) {
    if (locals.userInfo) {
        await cancelPart(locals.userInfo.user_id);
        await deletePartNotificationsOfSender(locals.userInfo.user_id);
    }
    return new Response();
}