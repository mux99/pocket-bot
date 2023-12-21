import { getFriends } from "$lib/server/friend.js";
import { getFriendRequests } from "$lib/server/friendRequest.js";
import { getLocals } from "../../utils.js";
import { describe, expect, it } from "vitest";

describe("Test friendship", async () => {
    const locals = await getLocals();

    it("Test getFriends", async () => {
        const rows = await getFriends(locals);
        expect(rows).toBeTruthy();
    });

    it("Test getFriendRequests", async () => {
        const rows = await getFriendRequests(locals);
        expect(rows).toBeTruthy();
    })
});