import { Pool } from 'pg';

// those variables should be stord in .env file
import {
	POSTGRES_HOST,
	POSTGRES_PORT,
	POSTGRES_DATABASE,
	POSTGRES_USER,
	POSTGRES_PASSWORD
} from '$env/static/private';

export async function initDB() {
	const pool = new Pool({
		host: POSTGRES_HOST || 'localhost',
		port: POSTGRES_PORT || 5432,
		database: POSTGRES_DATABASE || 'postgres',
		user: POSTGRES_USER || 'postgres',
		password: POSTGRES_PASSWORD || 'postgres'
	});

	pool.query('SELECT NOW()');

	return pool;
}
