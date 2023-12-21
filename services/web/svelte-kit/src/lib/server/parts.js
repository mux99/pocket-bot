import {pool} from "../../hooks.server.js";

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

export async function createNewPart(player1Id, player2Id) {
    await pool.query({
        text: 'INSERT INTO parts (player1, player2, time_start) VALUES ($1, $2, DEFAULT);',
        values: [player1Id, player2Id]
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

export async function getCurrentPartsInfo(userId) {
    const {rows} = await pool.query({
        text:
          'SELECT u1.user_id AS "player1_id", u2.user_id AS "player2_id", u1.username AS "player1_username", u2.username AS"player2_username"\n' +
          'FROM parts AS "p"\n' +
          '    JOIN users AS "u1" ON p.player1 = u1.user_id\n' +
          '    JOIN users AS "u2" ON p.player2 = u2.user_id\n' +
          'WHERE $1 IN (p.player1, p.player2);',
        values: [userId]
    });
    if (!rows)
        return {};
    return rows[0];
}

export async function getLoser(userId) {
    const {rows} = await pool.query({
        text: 'SELECT loser FROM parts WHERE $1 IN (player1, player2) LIMIT 1;',
        values: [userId]
    });
    if (!rows.length)
        return null;
    return rows[0].loser;
}

export async function losePart(userId) {
    await pool.query({
        text: 'UPDATE parts SET loser = $1 WHERE $1 IN (player1, player2);',
        values: [userId]
    });
}

export async function deleteParts(userId) {
    await pool.query({
        text: 'DELETE FROM parts WHERE $1 IN (player1, player2);',
        values: [userId]
    });
}

export async function archivePart(loserId) {
    const {rows} = await pool.query({
        text: 'SELECT player1, player2, time_start FROM parts WHERE $1 IN (player1, player2) LIMIT 1;',
        values: [loserId]
    });
    if (!rows || !rows.length)
        return;
    let winner;
    if (rows[0].player1 === loserId) {
        winner = rows[0].player2;
    } else {
        winner = rows[0].player1;
    }
    await pool.query({
        text: 'INSERT INTO archive_parts (part_id, winner, loser, duration_ms, date) VALUES (DEFAULT, $1, $2, $3, CURRENT_TIMESTAMP)',
        values: [winner, loserId, new Date().getTime() - rows[0].time_start]
    });
}
