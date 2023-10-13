import { Pool } from 'pg';

// those variables should be stored in .env file
import {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DATABASE,
	POSTGRES_USER,
	POSTGRES_PASSWORD
} from '$env/static/private';

/**
 * Creates a new connection pool to a PostgreSQL database.
 * @returns {Pool} A new instance of the Pool class from the 'pg' library.
 */
export function createPool() {
	console.info('Creating a new connection pool to PostgreSQL...');

	return new Pool({
		host: POSTGRES_HOST || 'localhost',
		port: POSTGRES_PORT || 5432,
		database: POSTGRES_DATABASE || 'postgres',
		user: POSTGRES_USER || 'postgres',
		password: POSTGRES_PASSWORD || 'postgres'
	});
}

/**
 * Tests the connection to the PostgreSQL database using the provided pool object.
 * @param {Object} pool - The pool object used to connect to the database.
 * @returns {Promise<void>} - A promise that resolves when the connection is successful.
 */
export async function testConnection(pool) {
	const { rows } = await pool.query('SELECT NOW()');
	if (rows.length) {
		console.info('Successfully connected to PostgreSQL');
	}
}
