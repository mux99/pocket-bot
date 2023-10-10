import { connectToDB } from '$lib/db';

export const handle = async ({ event, resolve }) => {
	const pool = await connectToDB();
	event.locals = { pool };
	const response = await resolve(event);
	pool.release();

	return response;
};
