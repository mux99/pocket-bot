import { pool } from '../../hooks.server.js';

export function sendNotification(userId, type, senderId) {
	pool.query({
		text: 'INSERT INTO notifications (receiver_id, type, sender_id) VALUES ($1, $2, $3);',
		values: [userId, type, senderId]
	});
}

export async function markNotificationAsSeen(notificationId) {
	await pool.query({
		text: 'UPDATE notifications SET seen=TRUE WHERE notification_id=$1;',
		values: [notificationId]
	});
}

export async function markNotificationAsUnseen(notificationId) {
	await pool.query({
		text: 'UPDATE notifications SET seen=FALSE WHERE notification_id=$1;',
		values: [notificationId]
	});
}

export function deleteNotification(notificationId) {
	pool.query({
		text: 'DELETE FROM notifications WHERE notification_id=$1',
		values: [notificationId]
	});
}

export async function getNotificationsOf(userId) {
	const {rows} = await pool.query({
		text:
			'SELECT n.notification_id AS "id", type, seen, u.username AS "sender"\n' +
			'FROM notifications AS "n" LEFT JOIN users AS "u" ON n.sender_id = u.user_id\n' +
			'WHERE receiver_id=$1;',
		values: [userId]
	});
	return rows ? rows : [];
}

export async function isNotificationOwnedBy(userId, notificationId) {
	const {rows} = await pool.query({
		text: 'SELECT EXISTS(SELECT 1 FROM notifications WHERE receiver_id=$1 AND notification_id=$2);',
		values: [userId, notificationId]
	});
	return rows[0].exists;
}
