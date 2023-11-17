import { createPool, testConnection } from '$lib/server/db';
import { getUserinfo } from '$lib/server/account';

export const pool = createPool();
testConnection(pool);

export async function handle({ event, resolve }) {
	event.locals.pool = pool;
	event.locals.userInfo = await getUserinfo(event);
	return await resolve(event);
}

export function handleError({ error }) {
	console.error(error.stack);
}
