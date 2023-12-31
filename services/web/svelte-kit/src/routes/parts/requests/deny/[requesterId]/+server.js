import {json, redirect} from "@sveltejs/kit";
import {denyPart, doesPartExist} from "$lib/server/parts.js";
import { deleteSpecificNotification } from '$lib/server/notifications.js';

export async function POST({locals, params}) {
    if (!locals.userInfo)
        throw redirect(307, '/login');
    const {requesterId} = params;
    if (!await doesPartExist(requesterId, locals.userInfo.user_id))
        return json({});
    await denyPart(requesterId);
    await deleteSpecificNotification(locals.userInfo.user_id, requesterId, 'parts');
    return json({});
}
