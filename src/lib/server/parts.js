import {pool} from "../../hooks.server.js";
import {rows} from "pg/lib/defaults.js";

export async function askNewPart(requesterId, opponentId) {
    await pool.query({
        text: 'INSERT INTO part_proposal (requester_id, opponent_id) VALUES ($1, $2);',
        values: [requesterId, opponentId]
    });
}

export async function getPartAskedByUser(userId) {
    const {rows} = await pool.query({
        text:
            'SELECT ur.user_id AS "requester_id", ur.username AS "requester_username", uo.user_id AS "opponent_id", uo.username AS "opponent_username"\n' +
            'FROM part_proposal AS "pp"\n' +
            '    JOIN users AS ur ON pp.requester_id = ur.user_id\n' +
            '    JOIN users AS uo ON pp.opponent_id = uo.user_id\n' +
            'WHERE requester_id=$1;',
        values: [userId]
    });
    return rows ? rows[0] : null;
}

export async function getPartsAskedByOtherUsers(userId) {
    const {rows} = await pool.query({
        text:
        'SELECT ur.user_id AS "requester_id", ur.username AS "requester_username", uo.user_id AS "opponent_id", uo.username AS "opponent_username"\n' +
            'FROM part_proposal AS "pp"\n' +
            '    JOIN users AS ur ON pp.requester_id = ur.user_id\n' +
            '    JOIN users AS uo ON pp.opponent_id = uo.user_id\n' +
            'WHERE opponent_id=$1 AND accepted IS NULL;',
        values: [userId]
    });
    return rows;
}

export async function cancelPart(userId) {
    await pool.query({
        text: 'DELETE FROM part_proposal WHERE requester_id=$1;',
        values: [userId]
    });
}

export async function doesPartExist(requesterId, opponentId) {
    const {rows} = await pool.query({
        text: 'SELECT requester_id FROM part_proposal WHERE requester_id=$1 AND opponent_id=$2',
        values: [requesterId, opponentId]
    });
    return rows.length;
}

export async function acceptPart(requesterId) {
    await pool.query({
        text: 'UPDATE part_proposal SET accepted=TRUE WHERE requester_id=$1',
        values: [requesterId]
    });
}
export async function denyPart(requesterId) {
    await pool.query({
        text: 'UPDATE part_proposal SET accepted=FALSE WHERE requester_id=$1',
        values: [requesterId]
    });
}

export async function getPartRequestStatus(requesterId) {
    const {rows} = await pool.query({
        text: 'SELECT accepted FROM part_proposal WHERE requester_id=$1',
        values: [requesterId]
    });
    if (!rows.length)
        return null;
    return rows[0].accepted;
}

export async function getAllParts() {
    const {rows} = await pool.query({
        text: 'SELECT part_id, duration_ms, date FROM archive_parts ORDER BY part_id',
    });
    return rows;
}