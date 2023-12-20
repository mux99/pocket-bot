import { redirect } from '@sveltejs/kit';
import { archivePart, losePart } from '$lib/server/parts.js';


export async function POST({locals}) {
  if (!locals.userInfo)
    throw redirect(307, '/login');
  await archivePart(locals.userInfo.user_id);
  await losePart(locals.userInfo.user_id);
  return new Response();
}
