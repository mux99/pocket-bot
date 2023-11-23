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

        if (!await checkIfUsernameExists(username)) {
            return {
                success: false,
                message: 'Username does not exist'
            };
        };

        if (!await checkIfPasswordIsCorrect(username, password)) {
            return {
                success: false,
                message: 'Incorrect password'
            };
        };

        const userId = await getUserId(username);
        const uuid = generateUuid();
        await setSession(userId, uuid, cookies);

        return {
            success: true,
            message: 'Successfully logged in'
        };
    }
}