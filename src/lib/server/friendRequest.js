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