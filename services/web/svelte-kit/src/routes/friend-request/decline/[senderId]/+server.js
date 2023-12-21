import {declineRequest} from "$lib/server/friendRequest.js";
import { deleteSpecificNotification } from '$lib/server/notifications.js';

export async function POST({locals, params}) {
    const { senderId } = params;
    await declineRequest(locals, senderId)
    await deleteSpecificNotification(locals.userInfo.user_id, senderId, 'friends');
    return new Response();
}