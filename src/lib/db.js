import { Pool } from 'pg';

/**
 * Create a new connection pool to the database.
 */

const pool = new Pool({
	host: 'localhost',
	port: 5432,
	database: 'pocketbot',
	user: 'postgres',
	password: 'example'
});

/**
 * Connect to the PostgreSQL database.
 * @returns {Promise<import("pg").Client>} A new client from the connection pool.
 */
export const connectToDB = async () => await pool.connect();
