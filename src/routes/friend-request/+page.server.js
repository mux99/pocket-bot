import {fail} from "@sveltejs/kit";
import {
    getFormData,
    getReceiverId,
    getSenderId,
    sendFriendRequest
} from "$lib/server/friendRequest.js";

export const actions = {
    default: async ({ request, locals, cookies }) => {
        let errors = {};
        let receiverId = null;

        const { username } = await getFormData(request);

        ({ errors, receiverId } = await getReceiverId(locals, username));
        if (Object.keys(errors).length) {
            return fail(400, errors);
        }

        const senderId = await getSenderId(cookies, locals);

        errors = await sendFriendRequest(locals, senderId, receiverId);
        if (Object.keys(errors).length) {
            return fail(400, errors);
        }
    }
};