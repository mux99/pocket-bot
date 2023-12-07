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

export async function checkIfAlreadyFriend(locals, receiverId) {
    try {
        const { rows } = await locals.pool.query({
            text: 'SELECT * FROM friends WHERE user_id_1 = $1 AND user_id_2 = $2 UNION SELECT * FROM friends WHERE user_id_2 = $1 AND user_id_1 = $2',
            values: [locals.userInfo.user_id, receiverId]
        });
        return !rows.length;

    } catch (e) {
        console.log(e.message);
    }
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

    let order = [];
    if (senderId < locals.userInfo.user_id) {
        order.push(senderId);
        order.push(locals.userInfo.user_id);
    } else {
        order.push(locals.userInfo.user_id);
        order.push(senderId);
    }
    try {
        await locals.pool.query({
            text: 'INSERT INTO friends (user_id_1, user_id_2) VALUES ($1, $2)',
            values: order
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