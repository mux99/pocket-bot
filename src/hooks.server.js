import { initDatabase } from '$lib/server/db';

const pool = await initDatabase();

export async function handle({ event, resolve }) {
	event.locals.pool = pool;

	const response = await resolve(event);

	return response;
}
