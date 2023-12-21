import { deleteParts, getLoser } from '$lib/server/parts.js';

const headers = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive'
};

export async function GET({locals}) {
  if (!locals.userInfo)return;
  const {user_id} = locals.userInfo;
  const loser = await getLoser(user_id);
  if (loser)
    await deleteParts(locals.userInfo.user_id);
  const stream = new ReadableStream({
    start(controller) {

      controller.enqueue(`data: ${JSON.stringify({loser})}\n\n`);
      controller.close();
    },
    cancel() {

    }
  });
  return new Response(stream, {headers});
}