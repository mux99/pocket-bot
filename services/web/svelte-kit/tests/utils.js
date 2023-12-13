import pkg from 'pg';
const {Pool} = pkg;
import * as crypto from 'crypto';

export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || 'postgres';
export const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';

export function getTempPool() {
	return new Pool({
		host: process.env.POSTGRES_HOST || 'localhost',
		port: process.env.POSTGRES_PORT || 5432,
		database: process.env.POSTGRES_DATABASE || 'postgres',
		user: process.env.POSTGRES_USER || 'postgres',
		password: process.env.POSTGRES_PASSWORD || 'postgres'
	});
}

export async function getSessionUuidByUsername(username) {
    const pool = getTempPool();
    const {rows} = await pool.query({
        text: 'SELECT uuid FROM sessions AS "s" JOIN users AS "u" ON s.user_id=u.user_id  WHERE expires_at > CURRENT_TIMESTAMP AND u.username=$1;',
        values: [username]
    });
    pool.end();
    return rows[0].uuid;
}

export async function getLoggedCookiesByUsername(username) {
    const sessionUuid = await getSessionUuidByUsername(username);
    return {
        name: 'uuid',
        value: sessionUuid,
        domain: 'localhost',
        path: '/',
        expires: -1
    };
}

export async function getUserInfo() {
	const {rows} = await getTempPool().query({
		text: 'SELECT user_id, username FROM users LIMIT 1;',
		values: []
	});
	console.log(rows)
	return rows[0];
}

export async function getLocals() {
	const locals = {};
	locals.pool = getTempPool();
	locals.userInfo = await getUserInfo();
	return locals;
}

export async function deleteUserByUsername(username) {
	await getTempPool().query({
		text: 'DELETE FROM users WHERE username=$1',
		values: [username]
	});
}

export async function insertSomeParts(userId) {
	await getTempPool().query({
		text:
			'INSERT INTO archive_parts (winner, loser, duration_ms, date)\n' +
			'VALUES\n' +
			'    ((SELECT user_id FROM users WHERE user_id != $1 LIMIT 1), $1, 10000, CURRENT_TIMESTAMP),\n' +
			'    ((SELECT user_id FROM users WHERE user_id != $1 LIMIT 1), $1, 10000, CURRENT_TIMESTAMP + INTERVAL \'1\' DAY),\n' +
			'    ((SELECT user_id FROM users WHERE user_id != $1 LIMIT 1), $1, 10000, CURRENT_TIMESTAMP + INTERVAL \'2\' DAY),\n' +
			'    ((SELECT user_id FROM users WHERE user_id != $1 LIMIT 1), $1, 10000, CURRENT_TIMESTAMP + INTERVAL \'3\' DAY);',
		values: [userId]
	});
}

export async function deletePartsOf(userId) {
	await getTempPool().query({
		text: 'DELETE FROM archive_parts WHERE winner=$1 OR loser=$1;',
		values: [userId]
	});
}

export async function createDbSessions(userId) {
	await getTempPool().query({
		text: 'INSERT INTO sessions (user_id, uuid, expires_at) VALUES ($1, $2, CURRENT_TIMESTAMP + INTERVAL \'3\' DAY);',
		values: [userId, crypto.randomUUID()]
	});
}

export async function getDbSessions(userId) {
	const {rows} = await getTempPool().query({
		text: 'SELECT * FROM sessions WHERE user_id=$1;',
		values: [userId]
	});
	return rows;
}

export async function getTableDataOfUsers(username) {
	const {rows} = await getTempPool().query({
		text: 'SELECT * FROM users WHERE username=$1 LIMIT 1;',
		values: [username]
	});
	return rows[0];
}

export async function setAdminFromUsername(username) {
    await getTempPool().query({
        text: 'INSERT INTO users_roles (user_id, role_id) VALUES ((SELECT user_id FROM users WHERE username=$1), 2);',
        values: [username]
    });
}

export async function insertSession(username) {
    await getTempPool().query({
        text: 'INSERT INTO sessions (user_id, uuid, expires_at) VALUES ((SELECT user_id FROM users WHERE username=$1), $2, CURRENT_TIMESTAMP + INTERVAL \'2\' DAY);',
        values: [username, crypto.randomUUID()]
    });
}

export async function getSessionUuid() {
	const pool = getTempPool();
	const {rows} = await pool.query({
		text: 'SELECT uuid FROM sessions WHERE expires_at > CURRENT_TIMESTAMP;',
		values: []
	});
	pool.end();
	return rows[0].uuid;
}

export async function getLoggedCookies() {
	const sessionUuid = await getSessionUuid();
	return {
		name: 'uuid',
		value: sessionUuid,
		domain: 'localhost',
		path: '/',
		expires: -1
	};
}
