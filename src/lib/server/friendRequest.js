export async function getFormData(request) {
    const formData = await request.formData();
    const username = String(formData.get('username'));
    return { username };
}

export async function sendFriendRequest(locals, senderId, receiverId){
    await locals.pool.query({
        text: 'INSERT INTO friend_requests (sender_id, receiver_id, sent_on) VALUES ($1, $2, $3)',
        values: [senderId, receiverId, new Date().toISOString()]
    });
}

export async function getFriendRequests(locals) {
    try {
        const { rows } = await locals.pool.query({
            text: 'SELECT sender_id, username FROM friend_requests JOIN users ON sender_id = user_id WHERE receiver_id = $1 AND is_confirmed = \'no\'',
            values: [locals.userInfo.user_id]
        });
        return rows;
    } catch (e) {
        console.log(e.message);
    }
}

export async function acceptRequest(locals, senderId) {
    try {
        await locals.pool.query({
            text: 'UPDATE friend_requests SET is_confirmed = \'yes\' WHERE sender_id = $1 AND receiver_id = $2',
            values: [senderId, locals.userInfo.user_id]
        });
    } catch (e) {
        console.log(e.message);
    }

    try {
        await locals.pool.query({
            text: 'INSERT INTO friends (user_id_1, user_id_2) VALUES ($1, $2)',
            values: [senderId, locals.userInfo.user_id]
        });
    } catch (e) {
        console.log(e.message);
    }
}

export async function declineRequest(locals, senderId) {
    try {
        await locals.pool.query({
            text: 'DELETE FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2',
            values: [senderId, locals.userInfo.user_id]
        });
    } catch (e) {
        console.log(e.message);
    }
}