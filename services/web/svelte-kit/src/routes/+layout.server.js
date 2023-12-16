import { getCurrentPartsInfo } from '$lib/server/parts.js';
import { getNotificationsOf } from '$lib/server/notifications.js';

export async function load({locals}) {
  if (!locals.userInfo)
    return {};
    const user = locals.userInfo;
    user.notifications = await getNotificationsOf(locals.userInfo.user_id);
  const part = await getCurrentPartsInfo(locals.userInfo.user_id);
  return {
    part,
    user: user.userInfo
  };
}
