import {
    getFormData,
    checkIfPasswordIsCorrect,
    getUserId,
    generateUuid,
    setSession,
    checkIfUsernameExists
} from '$lib/server/account';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals, cookies }) => {
        const { username, password } = await getFormData(request);

        if (!await checkIfUsernameExists(locals, username)) {
            return {
                success: false,
                message: 'Username or password incorrect'
            };
        }
        if (!await checkIfPasswordIsCorrect(username, password)) {
            return {
                success: false,
                message: 'Username or password incorrect'
            };
        }

        const userId = await getUserId(locals, username);
        const uuid = generateUuid();
        await setSession(locals, userId, uuid, cookies);

        return {
            success: true,
            message: 'Successfully logged in'
        };
    }
}
