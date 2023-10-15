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
		const saltRounds = 10;

		const { username, password } = await getFormData(request);
		errors = checkFormFields(username, password);

		if (Object.keys(errors).length) {
			return fail(400, errors);
		}

		const hashedPasword = await hashPassword(password, saltRounds);

		({ errors, user_id } = await createUser(locals, username, hashedPasword));

		if (Object.keys(errors).length) {
			return fail(400, errors);
		}

		const uuid = generateUuid();
		console.log(uuid);
		await setSession(locals, user_id, uuid, cookies);

		throw redirect(303, '/');
	}
};
