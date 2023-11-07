import {
    getFormData,
    checkIfUsernameExists,
    checkIfPasswordIsCorrect,
    getUserId,
    generateUuid,
    setSession
} from '$lib/server/account';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals, cookies }) => {
        const { username, password } = await getFormData(request);

        const check1 = await checkIfUsernameExists(locals, username);
        if (!check1) {
            return {
                success: false,
                message: 'Username does not exist'
            };
        };

        const check2 = await checkIfPasswordIsCorrect(locals, username, password);
        if (!check2) {
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
};