import { getCurrentPartsInfo } from '$lib/server/parts.js';

export async function load({locals}) {
  if (!locals.userInfo)
    return {};
  const part = await getCurrentPartsInfo(locals.userInfo.user_id);
  return {
    part
  };
}
