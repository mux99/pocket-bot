import {getFormData, usernameToId} from "$lib/server/account.js";
import {askNewPart, getPartAskedByUser} from "$lib/server/parts.js";
import {redirect} from "@sveltejs/kit";
import { sendNotification } from '$lib/server/notifications.js';

export const actions = {
    default: async ({locals, request}) => {
        const {user_id} = locals.userInfo;
        if (!user_id)
            throw redirect(307, '/login');
        const {username} = await getFormData(request);
        if (!username)
            return {success: false, message: "Please enter an username !"};
        const opponentId = await usernameToId(username);
        if (await getPartAskedByUser(user_id))
            return {success: false, message: "You already requests a part !"};
        if (!opponentId)
            return {success: false, message: `User "${username}" not found ...`};
        if (opponentId === user_id)
            return {success: false, message : "You can't ask yourself !"};
        await askNewPart(user_id, opponentId);
        await sendNotification(opponentId, "parts", user_id);
        return {success: true, message: "Part requests successfully", opponent: username};
    }
}
