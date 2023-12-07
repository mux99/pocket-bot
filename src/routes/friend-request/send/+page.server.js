import {
    checkIfAlreadyFriend,
    getFormData,
    sendFriendRequest
} from "$lib/server/friendRequest";
import {
    getUserId,
    usernameToId
} from "$lib/server/account";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const { username } = await getFormData(request);

        if (!await usernameToId(username)) {
            return {
                success: false,
                message: 'Username does not exist'
            };
        }

        const senderId = locals.userInfo.user_id;
        const receiverId = await getUserId(locals, username);

        if (senderId === receiverId) {
            return {
                success: false,
                message: 'No self-request'
            };
        }

        if (!await checkIfAlreadyFriend(locals, receiverId)) {
            return {
                success: false,
                message: 'You are already friends'
            };
        }

        try {
            await sendFriendRequest(locals, senderId, receiverId);
            return {
                success: true,
                message: 'Request sent successfully'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Request already sent'
            }
        }
    }
};