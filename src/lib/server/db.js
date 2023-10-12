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
function createPool() {
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
async function testConnection(pool) {
	const { rows } = await pool.query('SELECT NOW()');
	if (rows.length) {
		console.log(`Connected to PostgreSQL`);
	}
}

/**
 * Logs the connection details to the console.
 */
function logConnectionDetails() {
	console.log(`Connection details:
- Host: ${POSTGRES_HOST || 'localhost'}
- Port: ${POSTGRES_PORT || 5432}
- Database: ${POSTGRES_DATABASE || 'postgres'}
- User: ${POSTGRES_USER || 'postgres'}
- Password: ${POSTGRES_PASSWORD || 'postgres'}`);
}

/**
 * Initializes the database connection pool tests the connection and log connection details.
 * @returns {Promise<Pool>} A promise that resolves with the connection pool object.
 */
export async function initDatabase() {
	const pool = createPool();
	await testConnection(pool);
	logConnectionDetails();
	return pool;
}
