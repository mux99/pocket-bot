import { deleteBrowserSession, deleteDbSession } from '$lib/server/account.js';
import { redirect } from '@sveltejs/kit';

export async function POST({ locals, cookies }) {
  await deleteDbSession(locals)
  await deleteBrowserSession(cookies)
  throw redirect(303, '/login');
}