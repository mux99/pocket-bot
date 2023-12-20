import {expect, test} from "@playwright/test";
import pkg from 'pg';
const {Pool} = pkg;

function getTempPool() {
    return new Pool({
       host: process.env.POSTGRES_HOST || 'localhost',
       port: process.env.POSTGRES_PORT || 5432,
       database: process.env.POSTGRES_DATABASE || 'postgres',
       user: process.env.POSTGRES_USER || 'postgres',
       password: process.env.POSTGRES_PASSWORD || 'postgres'
    });
}

test("Check the 'roles' table exists and is well formed", async () => {
    const pool = getTempPool();
    const { rows } = await pool.query('SELECT * FROM roles');
    const expectedColumns = ['role_id', 'name'];

    expect(rows.length).toBeGreaterThan(0);

    expect(Object.keys(rows[0]).length).toBe(expectedColumns.length);

    for (const column of expectedColumns) {
        expect(rows[0][column]).toBeDefined();
    }
});

test("Check the 'users_roles' table exists and is well formed", async () => {
    const pool = getTempPool();
    const { rows } = await pool.query('SELECT * FROM users_roles');
    const expectedColumns = ['user_id', 'role_id'];

    expect(rows.length).toBeGreaterThan(0);

    expect(Object.keys(rows[0]).length).toBe(expectedColumns.length);

    for (const column of expectedColumns) {
        expect(rows[0][column]).toBeDefined();
    }
});

test("Check if the mandatory roles are present", async () => {
    const pool = getTempPool();
    const { rows } = await pool.query('SELECT * FROM roles');
    const rolesToHave = [{id: 0, name: 'suspended'}, {id: 1, name: 'user'}, {id: 2, name: 'admin'}];

    for (const role of rolesToHave) {
        const found = rows.find(row => row.role_id === role.id && row.name === role.name);
        expect(found).toBeTruthy();
    }

    pool.end();
});