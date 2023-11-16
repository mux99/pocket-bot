import {getPartRequestStatus} from "$lib/server/parts.js";
import {use} from "bcrypt/promises.js";

const headers = {
    // Denotes the response as SSE
    'Content-Type': 'text/event-stream',
        // Optional. Request the GET request not to be cached.
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
};
export async function GET({locals}) {
    if (!locals.userInfo)return;
    const {user_id} = locals.userInfo;
    const isAccepted = await getPartRequestStatus(user_id);
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(`data: ${JSON.stringify({accepted: isAccepted})}\n\n`);
            controller.close()
        },
        cancel() {

        }
    });

    return new Response(stream, {headers: headers});
}
