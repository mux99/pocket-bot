import {pool} from "../../hooks.server.js";

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

export async function getUserInfo(userId) {
    const { rows } = await pool.query(`
        SELECT users.*, array_agg(DISTINCT roles.name) as roles
        FROM users
        LEFT JOIN users_roles ON users.user_id = users_roles.user_id
        LEFT JOIN roles ON users_roles.role_id = roles.role_id
        WHERE users.user_id = $1
        GROUP BY users.user_id
        `, [userId]);
    return rows[0];
}

export async function updateUser(username, userId) {
    await pool.query({
        text: "UPDATE users SET username = $1 WHERE user_id = $2",
        values: [username, userId]
    });
}