import {cancelPart} from "$lib/server/parts.js";

export async function POST({locals}) {
    if (locals.userInfo) {
        await cancelPart(locals.userInfo.user_id);
    }
    return new Response();
}