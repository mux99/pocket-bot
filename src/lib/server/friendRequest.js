import { pool } from "../../hooks.server.js";

export async function getFormData(request) {
    const formData = await request.formData();
    const username = String(formData.get('username'));
    return { username };
}

export async function sendFriendRequest(senderId, receiverId){
    await pool.query({
        text: 'INSERT INTO friend_requests (sender_id, receiver_id, sent_on) VALUES ($1, $2, $3)',
        values: [senderId, receiverId, new Date().toISOString()]
    });
}