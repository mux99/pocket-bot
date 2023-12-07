import {declineRequest} from "$lib/server/friendRequest.js";

export async function POST({locals, params}) {
    const { senderId } = params;
    await declineRequest(locals, senderId);
}