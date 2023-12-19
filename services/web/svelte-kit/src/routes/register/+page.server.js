import { redirect, fail } from '@sveltejs/kit';
import {
	getFormData,
	checkFormFields,
	hashPassword,
	createUser,
	generateUuid,
	setSession
} from '../../lib/server/account.js';

export const actions = {
	default: async ({ request, locals, cookies }) => {
		let user_id = null;
		let errors = {};

		const { username, password } = await getFormData(request);
		errors = await checkFormFields(username, password, locals);

		if (errors.username.length || errors.password.length) {
			return fail(400, errors);
		}

		const hashedPassword = await hashPassword(password);

		({ user_id } = await createUser(locals, username, hashedPassword));

		const uuid = generateUuid();
		await setSession(locals, user_id, uuid, cookies);


		throw redirect(303, '/');
	}
};
