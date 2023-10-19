export async function getFormData(request) {
    const formData = await request.formData();
    const username = String(formData.get('username'));
    return { username };
}

export async function getReceiverId(locals, username) {
    let errors = {};

    const query = await locals.pool.query({
        text: 'SELECT user_id FROM users WHERE username = $1',
        values: [username]
    });

    if (query.rows.length > 0) {
        return {
            errors: errors,
            receiverId: query.rows[0].user_id
        };
    }

    errors.receiver = "Username does not exists"
    return {
        errors: errors,
        receiverId: null
    };
}

export async function getSenderId(cookies, locals) {
    const uuid = cookies.get('uuid');
    if (!uuid) {
        return null;
    }

    const query = await locals.pool.query({
        text: 'SELECT user_id FROM sessions WHERE uuid = $1',
        values: [uuid]
    });

    return query.rows[0].user_id
}

export async function sendFriendRequest(locals, sender_id, receiver_id){
    let errors = {};
    const date = new Date();

    try {
        await locals.pool.query({
            text: 'INSERT INTO friend_requests (sender_id, receiver_id, sent_on) VALUES ($1, $2, $3)',
            values: [sender_id, receiver_id, date.toISOString()]
        });
        return errors;

    } catch (error) {
        if (error.code === 23505) {
            errors.request = "Request exists";
            return errors;
        }

        throw Error(error);
    }
}