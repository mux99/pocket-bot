import { createPool, testConnection } from '$lib/server/db';
import { getUserinfo } from '$lib/server/account';
import { redirect } from '@sveltejs/kit';

const pool = createPool();
await testConnection(pool);

export async function handle({ event, resolve }) {
	event.locals.pool = pool;
	event.locals.userInfo = await getUserinfo(event);

	if (event.url.pathname !== '/login' && event.url.pathname !== '/register') {
		if (!event.locals.userInfo) throw redirect(308, '/login');
	} else {
		if (event.locals.userInfo) throw redirect(303, '/');
	};

	const response = await resolve(event);

	return response;
};

export function handleError({ event, error }) {
	console.error(error.stack);
}
