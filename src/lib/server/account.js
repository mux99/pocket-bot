import bcrypt from 'bcrypt';

export async function getFormData(request) {
	const formData = await request.formData();
	const username = String(formData.get('username'));
	const password = String(formData.get('password'));
	return { username, password };
}

export async function checkFormFields(username, password, locals) {
	let errors = {
		username: [],
		password: []
	};

	if (!username) {
		errors.username.push('Username is required');
	}

	if (!password) {
		errors.password.push('Password is required');
	}

	// query = await locals.pool.query({
	// 	text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id',
	// 	values: [username, hashedPassword]
	// }

	const query = await locals.pool.query(
		{
			text: 'SELECT username FROM users WHERE username = $1',
			values: [username]
		}
	)

	if (query.rows.length) {
		errors.username.push('Username is already taken');
	}

	if (password.length < 8) {
		errors.password.push('Password must be at least 8 characters long');
	}

	if (!/[A-Z]/.test(password)) {
		errors.password.push('Password must contain at least one uppercase character');
	}
	if (!/\d/.test(password)) {
		errors.password.push('Password must contain at least one number');
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
	// todo: enlever erreur déjà affichée avant dans le code
	let query = null;

	query = await locals.pool.query({
		text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id',
		values: [username, hashedPassword]
	});

	return {
		user_id: query.rows[0].user_id
	};
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

export async function getUserinfo({ cookies, locals }) {
	const uuid = cookies.get('uuid');

	if (!uuid) {
		return null;
	}

	const { rows } = await locals.pool.query({
		text: 'SELECT user_id, username FROM sessions JOIN users USING (user_id) WHERE uuid = $1 AND expires_at > NOW()',
		values: [uuid]
	});

	return rows[0];
}
