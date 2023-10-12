import { register } from '$lib/server/account';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies, request, locals }) => {
		try {
			await register(request, cookies, locals);
		} catch (error) {
			return fail(400, error.body);
		}

		throw redirect(303, '/');
	}
};
