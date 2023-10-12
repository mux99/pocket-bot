import { error } from '@sveltejs/kit';

export async function register(request, cookies, locals) {
	let errors = {};

	const formData = await request.formData();
	const username = String(formData.get('username'));
	const password = String(formData.get('password'));

	if (!username || typeof username !== 'string') {
		errors.username = 'Username is required';
	}

	if (!password || typeof password !== 'string') {
		errors.password = 'Password is required';
	}

	if (Object.keys(errors).length) {
		throw error(400, errors);
	}

	try {
		await locals.pool.query({
			text: 'INSERT INTO users (username, password) VALUES ($1, $2)',
			values: [username, password]
		});
	} catch (error) {
		if (error.code === '23505') {
			errors.db = 'This username is already taken';
		}
		throw { status: 400, body: errors };
	}
}
