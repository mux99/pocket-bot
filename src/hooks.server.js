import { createPool, testConnection } from '$lib/server/db';
import { getUserinfo } from '$lib/server/account';
import { redirect } from '@sveltejs/kit';

export const pool = createPool();
testConnection(pool);

export async function handle({ event, resolve }) {
	event.locals.pool = pool;
	event.locals.userInfo = await getUserinfo(event);

	// if user is not logged in, redirect him to /login
	if (!event.locals.userInfo && event.url.pathname !== '/login' && event.url.pathname !== '/register') {
		throw redirect(307, '/login');
	}
	const response = await resolve(event);

	return response;
}

export function handleError({ error }) {
	console.error(error.stack);
}
