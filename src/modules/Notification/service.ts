import Notification, { INotification } from '@/models/Notification';
import wss from '../webSocketServer';
import { WebSocketWithUserId } from '../webSocketServer';
import { Store } from '@/models';
import Bookmark from '@/models/Bookmark';
import { AppError } from '@/utils';

const getBookmarkedUserIds = async (storeId: string): Promise<string[]> => {
	const bookmark = await Bookmark.find({ storeId }).select('userId');
	return bookmark.map((bookmark) => String(bookmark.userId));
};

export const postNotification = async (
	ownerId: string,
): Promise<INotification> => {
	const store = await Store.findOneAndUpdate(
		{ ownerId },
		[{ $set: { isOpen: { $not: '$isOpen' } } }],
		{ new: true },
	);
	if (!store) throw new AppError('해당하는 가게가 없습니다', 404);
	// 해당 가게를 즐겨찾기한 사용자 ID 목록 조회
	const bookmarkedUsers = await getBookmarkedUserIds(store._id as string);

	let notification;
	if (store!.isOpen) {
		notification = new Notification({
			recipients: bookmarkedUsers,
			sender: ownerId,
			type: 'open',
			content: `${store?.category}가게가 영업을 시작했습니다`,
		});
	} else {
		notification = new Notification({
			recipients: bookmarkedUsers,
			sender: ownerId,
			type: 'closed',
			content: `${store?.category}가게가 영업을 마감했습니다`,
		});
	}

	const savedNotification = await notification.save();
	const populateNotification = await savedNotification.populate('sender', [
		'category',
		'name',
	]);

	wss.clients.forEach((client) => {
		const wsClient = client as WebSocketWithUserId;
		if (
			client.readyState === WebSocket.OPEN &&
			bookmarkedUsers.includes(wsClient.userId)
		) {
			client.send(
				JSON.stringify({
					type: 'NEW_NOTIFICATION',
					data: populateNotification,
				}),
			);
		}
	});

	return savedNotification;
};

export const getNotification = async (
	userId: string,
): Promise<INotification[]> => {
	const notifications = await Notification.find({
		recipients: userId,
		isRead: false,
	}).populate('sender', ['category', 'name']);
	return notifications;
};

export const postAsRead = async (notificationId: string): Promise<void> => {
	const notification = await Notification.findById(notificationId);

	if (notification!.isRead) {
		// 이미 읽음 처리된 경우 그냥 리턴
		return;
	}
	notification!.isRead = true;
	await notification!.save();
};

export const postAsReadAll = async (userId: string): Promise<void> => {
	await Notification.updateMany(
		{ recipients: userId, isRead: false },
		{ $set: { isRead: true } },
	);
};
