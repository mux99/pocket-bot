import { error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
// import { v4 as uuidv4 } from 'uuid';

export async function getFormData(request) {
	const formData = await request.formData();
	const username = String(formData.get('username'));
	const password = String(formData.get('password'));
	return { username, password };
}

export function checkFormFields(username, password) {
	let errors = {};

	if (!username || typeof username !== 'string') {
		errors.username = 'Username is required';
	}

	if (!password || typeof password !== 'string') {
		errors.password = 'Password is required';
	}

	return errors;
}

export function throwErrors(errors) {
	if (Object.keys(errors).length) {
		throw Error('salut');
	}
}

export async function hashPassword(password, saltRounds) {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export async function createUser(locals, username, hashedPassword) {
	let errors = {};
	let query = null;

	try {
		query = await locals.pool.query({
			text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id',
			values: [username, hashedPassword]
		});

		return {
			errors: errors,
			user_id: query.rows[0].user_id
		};
	} catch (error) {
		if (error.code === '23505') {
			errors.db = 'Username is already taken';

			return {
				errors: errors,
				user_id: null
			};
		}
		throw Error(error);
	}
}

export function generateUuid() {
	const uuid = crypto.randomUUID();
	return uuid;
}

export async function setSession(locals, user_id, uuid, cookies) {
	// generate a date 7 days from now
	const now = new Date();
	const expires_at = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

	await locals.pool.query({
		text: 'INSERT INTO sessions (user_id, uuid, expires_at) VALUES ($1, $2, $3)',
		values: [user_id, uuid, expires_at]
	});

	cookies.set('uuid', uuid, {
		path: '/',
		expires: expires_at
	});
}
