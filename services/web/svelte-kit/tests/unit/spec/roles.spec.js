import { createUser, usernameToId } from '$lib/server/account.js';
import { deleteUserByUsername, getLocals } from '../../utils.js';

describe("Test roles table", async () => {
    const locals = await getLocals();

    it("Check roles table exists", async () => {
        const { rows } = await locals.pool.query("SELECT * FROM roles");
        expect(rows).toBeTruthy();
    });

    it("Check roles table is well formed", async () => {
        const { rows } = await locals.pool.query("SELECT * FROM roles");
        expect(rows[0]).toHaveProperty('role_id');
        expect(rows[0]).toHaveProperty('name');
        expect(Object.keys(rows[0])).toHaveLength(2);
    });
});

describe("Test users_roles table", async () => {
    const locals = await getLocals();

    it("Check users_roles table exists", async () => {
        const { rows } = await locals.pool.query("SELECT * FROM users_roles");
        expect(rows).toBeTruthy();
    });

    it("Check users_roles table is well formed", async () => {
        const { rows } = await locals.pool.query("SELECT * FROM users_roles");
        expect(rows[0]).toHaveProperty('user_id');
        expect(rows[0]).toHaveProperty('role_id');
        expect(Object.keys(rows[0])).toHaveLength(2);
    });
});

describe("Test mandatory roles", async () => {
    const locals = await getLocals();

    it("Check if the mandatory roles are present and have the correct ids", async () => {
        const expectedRoles = [{role_id: 0, name: 'suspended'}, {role_id: 1, name: 'user'}, {role_id: 2, name: 'admin'}];
        const { rows } = await locals.pool.query("SELECT * FROM roles");
        expect(rows).toEqual(expect.arrayContaining(expectedRoles));
    });
});

describe("Test user creation", async () => {
    const locals = await getLocals();

    it("Check user creation includes 'user' role", async () => {
        const username = "a_cool_username";
        expect(await createUser(locals, username, "a_valid_Passw0rd"));
        const userId = await usernameToId(username);
        const { rows } = await locals.pool.query("SELECT * FROM users_roles WHERE user_id = $1", [userId]);
        expect(rows).toEqual(expect.arrayContaining([{user_id: userId, role_id: 1}]));
        await deleteUserByUsername(username);
    });
});