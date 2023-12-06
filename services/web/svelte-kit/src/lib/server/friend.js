export async function getFriends(locals) {
    try {
        const { rows } = await locals.pool.query({
            text: 'SELECT user_id_2, username FROM friends JOIN users ON user_id_2 = user_id WHERE user_id_1 = $1 UNION SELECT user_id_1, username FROM friends JOIN users ON user_id_1 = user_id WHERE user_id_2 = $1',
            values: [locals.userInfo.user_id]
        });
        return rows;
    } catch (e) {
        console.log(e.message);
    }
}