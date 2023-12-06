import {acceptRequest} from "$lib/server/friendRequest.js";

export async function POST({locals, params}) {
    const { senderId } = params;
    await acceptRequest(locals, senderId);
    return new Response();
}