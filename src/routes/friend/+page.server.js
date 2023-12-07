import {getFriendRequests} from "$lib/server/friendRequest.js";
import {getFriends} from "$lib/server/friend.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    return {
        'requests': await getFriendRequests(locals),
        'friends': await getFriends(locals)
    };
}