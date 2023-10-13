import { createPool, testConnection } from '$lib/server/db';

const pool = createPool();
await testConnection(pool);

export async function handle({ event, resolve }) {
	event.locals.pool = pool;

	const response = await resolve(event);

	return response;
}
