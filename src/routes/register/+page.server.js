import { redirect, error, fail } from '@sveltejs/kit';
import {
	getFormData,
	checkFormFields,
	hashPassword,
	createUser,
	throwErrors
} from '../../lib/server/account.js';

export const actions = {
	default: async ({ request, locals }) => {
		try {
			let errors = {};

			const { username, password } = await getFormData(request);
			errors = checkFormFields(username, password);
			throwErrors(errors);
			const hashedPasword = await hashPassword(password);
			errors = await createUser(locals, username, hashedPasword);
			throwErrors(errors);
		} catch (error) {
			return fail(400, error.body);
		}

		throw redirect(303, '/');
	}
};
