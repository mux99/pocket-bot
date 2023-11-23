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
	default: async ({ request, cookies }) => {
		let user_id = null;
		let errors = {};
		const saltRounds = 10;

		const { username, password } = await getFormData(request);
		errors = await checkFormFields(username, password);

		if (errors.username.length || errors.password.length) {
			return fail(400, errors);
		}

		const hashedPasword = await hashPassword(password, saltRounds);

		({ user_id } = await createUser(username, hashedPasword));

		const uuid = generateUuid();
		await setSession(user_id, uuid, cookies);


		throw redirect(303, '/');
	}
};
