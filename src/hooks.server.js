import { initDB } from '$lib/server/db';

let pool;

try {
	pool = await initDB();
} catch (error) {
	console.error('Error connecting to database', error);
}

export async function handle({ event, resolve }) {
	event.locals.pool = pool;

	const response = await resolve(event);

	return response;
}
