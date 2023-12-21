import { getCurrentPartsInfo } from '$lib/server/parts.js';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
  if (!locals.userInfo)
    throw redirect(307, '/login');
  const currentPart = await getCurrentPartsInfo(locals.userInfo.user_id);
  return {
    part: currentPart,
    user_info: locals.userInfo
  };
}
