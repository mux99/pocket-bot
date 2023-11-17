import {
    getFormData,
    checkIfUsernameExists,
    checkIfPasswordIsCorrect,
    getUserId,
    generateUuid,
    setSession
} from '$lib/server/account';
import {redirect} from "@sveltejs/kit";

export const load = async (serverLoadEvent) => {
    const {locals} = serverLoadEvent;
    if (locals.userInfo)
        throw redirect(308, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals, cookies }) => {
        const { username, password } = await getFormData(request);

        if (!await checkIfUsernameExists(locals, username)) {
            return {
                success: false,
                message: 'Username does not exist'
            };
        };

        if (!await checkIfPasswordIsCorrect(locals, username, password)) {
            return {
                success: false,
                message: 'Incorrect password'
            };
        };

        const userId = await getUserId(locals, username);
        const uuid = generateUuid();
        await setSession(locals, userId, uuid, cookies);

        return {
            success: true,
            message: 'Successfully logged in'
        };
    }
}