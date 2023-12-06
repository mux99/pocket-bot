import {getFriendRequests} from "$lib/server/friendRequest.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    return {
        'post': await getFriendRequests(locals)
    };
}