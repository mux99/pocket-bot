import {
    getFormData,
    sendFriendRequest
} from "$lib/server/friendRequest";
import {
    getUserId,
    checkIfUsernameExists
} from "$lib/server/account";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const { username } = await getFormData(request);

        if (!await checkIfUsernameExists(locals, username)) {
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