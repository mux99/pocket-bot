import {pool} from "../../hooks.server.js";
import {rows} from "pg/lib/defaults.js";

export async function getUsers() {
    const { rows } = await pool.query(`
        SELECT users.*, array_agg(DISTINCT roles.name) as roles
        FROM users
        LEFT JOIN users_roles ON users.user_id = users_roles.user_id
        LEFT JOIN roles ON users_roles.role_id = roles.role_id
        WHERE users.deleted = false
        GROUP BY users.user_id
    `);
    return rows;
}