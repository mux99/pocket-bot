import bcrypt from 'bcrypt';

export async function getFormData(request) {
	const formData = await request.formData();
	const username = String(formData.get('username'));
	const password = String(formData.get('password'));
	return { username, password };
}

export function checkFormFields(username, password) {
	let errors = {
		password: []
	};

	if (!username || typeof username !== 'string') {
		errors.username = 'Username is required';
	}

	if (!password || typeof password !== 'string') {
		errors.password.push('Password is required');
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

	if (!errors.password.length) {
		return {};
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

export async function checkIfUsernameExists(locals, username) {
	const { rows } = await locals.pool.query({
		text: 'SELECT EXISTS (SELECT 1 FROM users WHERE username = $1) AS exists',
		values: [username]
	});

	return rows[0].exists;
}

export async function checkIfPasswordIsCorrect(locals, username, password) {
	const { rows } = await locals.pool.query({
		text: 'SELECT password AS hash FROM users WHERE username = $1',
		values: [username]
	});

	return await bcrypt.compare(password, rows[0].hash);
}

export async function getUserId(locals, username) {
	const { rows } = await locals.pool.query({
		text: 'SELECT user_id AS id FROM users WHERE username = $1',
		values: [username]
	});

	return rows[0].id;

export async function checkIfAdmin({ locals }) {
	const { rows } = await locals.pool.query({
		text: 'SELECT * FROM admins WHERE user_id = $1',
		values: [locals.userInfo.user_id]
	});

	return rows[0] ? true : false;
}