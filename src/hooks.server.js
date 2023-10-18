import { createPool, testConnection } from '$lib/server/db';
import { getUserinfo, checkIfAdmin } from '$lib/server/account';
import { redirect } from '@sveltejs/kit';

const pool = createPool();
testConnection(pool);

export async function handle({ event, resolve }) {
	event.locals.pool = pool;
	event.locals.userInfo = await getUserinfo(event);

	if (event.url.pathname !== '/login' && event.url.pathname !== '/register') {
		if (!event.locals.userInfo) throw redirect(308, '/login');
	}

	if (event.url.pathname.startsWith('/admin')) {
		const isAdmin = await checkIfAdmin(event);
		if (!isAdmin) throw redirect(308, '/');
	}

	const response = await resolve(event);

	return response;
}

export function handleError({ error }) {
	console.error(error.stack);
}
