import {
	checkFormFields,
	checkIfPasswordIsCorrect, checkIfUsernameExists,
	createUser, deleteDbSession,
	generateUuid, getArchiveParts, getUserId, getUserRoles,
	hashPassword, softDeleteUser,
	usernameToId
} from '$lib/server/account.js';
import {
	createDbSessions,
	deletePartsOf,
	deleteUserByUsername, getDbSessions,
	getLocals, getTableDataOfUsers, getTempPool,
	insertSomeParts
} from '../../utils.js';
import * as argon2 from "argon2";
import * as crypto from 'crypto';

describe("Test account file", async () => {
	const locals = await getLocals();
	it("Test checkFormFields", async () => {
		try {
			let errors = await checkFormFields(null, null, locals);
			expect(errors.username).arrayContaining(['Username is required']);
			expect(errors.password).arrayContaining(['Password is required']);
		} catch (e) {}

		let errors = await checkFormFields(locals.userInfo.username, "p", locals);
		expect(errors.username).toEqual(expect.arrayContaining(['Username is already taken']));
		expect(errors.password).toEqual(expect.arrayContaining(['Password must be at least 8 characters long']));

		const randomUsername = "fkeffe";
		errors = await checkFormFields(randomUsername, "a_very_long_password", locals);
		expect(errors.password).toEqual(expect.arrayContaining(['Password must contain at least one uppercase character']));

		errors = await checkFormFields(randomUsername, "a_very_long_Password", locals);
		expect(errors.password).toEqual(expect.arrayContaining(['Password must contain at least one number']));

		errors = await checkFormFields(randomUsername, "a_good_Pass0rd", locals);
		expect(errors.username).toStrictEqual([]);
		expect(errors.password).toStrictEqual([]);
	});

	it("Test hashPassword", async () => {
		const password = "a_password";
		let hashedPassword = await hashPassword(password);
		expect(await argon2.verify(hashedPassword, password)).true;
		expect(await argon2.hash(password)).not.toBe(hashedPassword);
	});

	it("Test createUser", async () => {
		const username = "a_cool_username"
		expect(await createUser(locals, username, "a_valid_Passw0rd"));
		await deleteUserByUsername(username)
	});

	it("Test generateUuid", async () => {
		expect(await generateUuid()).toBeTruthy();
	});

	it("test getUserRoles", async () => {
		let roles = await getUserRoles(locals.userInfo.user_id);
		expect(roles).toEqual(expect.arrayContaining(['user']));

		const username = crypto.randomUUID();
		await createUser(locals, username, await argon2.hash("a_password"));
		const id = await usernameToId(username);
		roles = await getUserRoles(id);
		expect(roles).toStrictEqual(['user']);
		await deleteUserByUsername(username);
	});

	it("Test checkIfPasswordIsCorrect", async () => {
		const username = crypto.randomUUID();
		const password = "a_password";
		await createUser(locals, username, await argon2.hash(password));
		expect(await checkIfPasswordIsCorrect(username, password)).true;
		expect(await checkIfPasswordIsCorrect(username, "invalid_password"));
		await deleteUserByUsername(username);
	});

	it("Test getUserId", async () => {
		expect(locals.userInfo.user_id).toBe(await getUserId(locals, locals.userInfo.username));
		await expect(getUserId(locals, crypto.randomUUID())).rejects.toThrowError();
	});

	it("Test getArchiveParts", async () => {
		await insertSomeParts(locals.userInfo.user_id);
		const parts = await getArchiveParts(locals.userInfo.user_id);
		expectTypeOf(parts).toBeArray();
		expect(parts).toBeTruthy();
		expect(parts[0]).toHaveProperty('id');
		expect(parts[0]).toHaveProperty('winner_id');
		expect(parts[0]).toHaveProperty('loser_id');
		expect(parts[0]).toHaveProperty('winner_username');
		expect(parts[0]).toHaveProperty('loser_username');
		expect(parts[0]).toHaveProperty('loser_deleted');
		expect(parts[0]).toHaveProperty('duration');
		expect(parts[0]).toHaveProperty('date');
		await deletePartsOf(locals.userInfo.user_id);
	});

	it("Test deleteDbSessions", async () => {
		const username = crypto.randomUUID();
		await createUser(locals, username, await argon2.hash('a_password'));
		const id = await usernameToId(username);
		await createDbSessions(id);
		let sessions = await getDbSessions(id);
		expectTypeOf(sessions).toBeArray();
		expect(sessions).not.toHaveLength(0);
		const tempLocals = {
			userInfo: {
				user_id: id
			},
			pool: getTempPool()
		};
		await deleteDbSession(tempLocals);
		sessions = await getDbSessions(id);
		expectTypeOf(sessions).toBeArray();
		expect(sessions).toHaveLength(0);
		await deleteUserByUsername(username);
	});

	it("Check usernameToId", async () => {
		expect(await usernameToId(locals.userInfo.username)).toStrictEqual(locals.userInfo.user_id);
		expect(await usernameToId(crypto.randomUUID())).toBeFalsy();
	});

	it("Check checkIfUsernameExists", async () => {
		expect(await checkIfUsernameExists(locals, locals.userInfo.username)).true;
		expect(await checkIfUsernameExists(locals, crypto.randomUUID())).false;
	});

	it("Check softDeleteUser", async () => {
		const username = crypto.randomUUID();
		await createUser(locals, username, await argon2.hash('a_password'));
		let userInfo = await getTableDataOfUsers(username);
		expect(userInfo).toHaveProperty('deleted', false);
		await createDbSessions(userInfo.user_id);
		let sessions = await getDbSessions(userInfo.user_id);
		const deleted = await softDeleteUser(locals.pool, sessions[0].uuid);
		expect(deleted).true;
	})
});

