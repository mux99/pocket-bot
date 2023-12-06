import {json, redirect} from "@sveltejs/kit";
import {acceptPart, doesPartExist} from "$lib/server/parts.js";
export async function POST({locals, params}) {
    if (!locals.userInfo)
        throw redirect(307, '/login');
    const {requesterId} = params;
    if (!await doesPartExist(requesterId, locals.userInfo.user_id))
        return json({success: false});
    await acceptPart(requesterId);
    return json({success: true});
}