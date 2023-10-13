import { error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

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
		throw error(400, errors);
	}
}

export async function hashPassword(password) {
	const saltRounds = 10;

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		console.error(error);
	}
}

export async function createUser(locals, username, hashedPassword) {
	let errors = {};

	try {
		await locals.pool.query({
			text: 'INSERT INTO users (username, password) VALUES ($1, $2)',
			values: [username, hashedPassword]
		});
	} catch (error) {
		if (error.code === '23505') {
			errors.db = 'Username is already taken';
		}
		console.error(error);
	} finally {
		return errors;
	}
}
