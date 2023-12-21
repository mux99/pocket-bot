import {json, redirect} from "@sveltejs/kit";
import { acceptPart, createNewPart, doesPartExist } from '$lib/server/parts.js';
import { deleteSpecificNotification } from '$lib/server/notifications.js';

export async function POST({locals, params}) {
    if (!locals.userInfo)
        throw redirect(307, '/login');
    const {requesterId} = params;
    if (!await doesPartExist(requesterId, locals.userInfo.user_id))
        return json({success: false});
    await acceptPart(requesterId);
    await createNewPart(requesterId, locals.userInfo.user_id);
    await deleteSpecificNotification(locals.userInfo.user_id, requesterId, 'parts');
    return json({success: true});
}
