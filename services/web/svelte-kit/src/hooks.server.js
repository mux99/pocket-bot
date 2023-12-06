import { createPool, testConnection } from '$lib/server/db';
import { getUserinfo } from '$lib/server/account';
import { redirect } from '@sveltejs/kit';

export const pool = createPool();
//estConnection(pool);

export async function handle({ event, resolve }) {
	event.locals.pool = pool;
	event.locals.userInfo = await getUserinfo(event);


	// if user is not logged in, redirect him to /login and allow him to navigate to /register
	if (!event.locals.userInfo && event.url.pathname !== '/login' && event.url.pathname !== '/register') {
		throw redirect(307, '/login');
	}

	// if user is logged in and navigate to /login or /register, redirect him to /
	if (event.locals.userInfo && (event.url.pathname === '/login' || event.url.pathname === '/register')) {
		throw redirect(307, '/');
	}
	const response = await resolve(event);

	return response;
}

export function handleError({ error }) {
	console.error(error.stack);
}

import {
	API_URL
} from '$env/static/private';
export const apiUrl = API_URL === undefined ? 'http://localhost:5173/' : API_URL;
