import { redirect, fail } from '@sveltejs/kit';
import {
	getFormData,
	checkFormFields,
	hashPassword,
	createUser,
	generateUuid,
	setSession
} from '$lib/server/account.js';

export const load = async (serverLoadEvent) => {
	const {locals} = serverLoadEvent;
	if (locals.userInfo)
		throw redirect('/');
}

export const actions = {
	default: async ({ request, locals, cookies }) => {
		let user_id = null;
		let errors = {};
		const saltRounds = 10;

		const { username, password } = await getFormData(request);
		errors = checkFormFields(username, password);

		if (Object.keys(errors).length) {
			return fail(400, errors);
		}

		const hashedPassword = await hashPassword(password, saltRounds);

		({ errors, user_id } = await createUser(locals, username, hashedPassword));

		if (Object.keys(errors).length) {
			return fail(400, errors);
		}

		const uuid = generateUuid();
		await setSession(locals, user_id, uuid, cookies);

		throw redirect(303, '/');
	}
};
