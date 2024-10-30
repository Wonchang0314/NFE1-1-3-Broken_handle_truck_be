import { Types } from 'mongoose';
import Notification, { INotification } from '@/models/Notification';
import wss from '../webSocketServer';
import { WebSocketWithUserId } from '../webSocketServer';
import { Store } from '@/models';
import Bookmark from '@/models/Bookmark';

const getBookmarkedUserIds = async (
	storeId: Types.ObjectId,
): Promise<string[]> => {
	const bookmark = await Bookmark.find({ storeId }).select('userId');

	return bookmark.map((bookmark) => String(bookmark.userId));
};

export const postNotification = async (
	storeId: Types.ObjectId,
): Promise<INotification> => {
	const store = await Store.findOneAndUpdate(
		{ _id: storeId },
		[{ $set: { isOpen: { $not: '$isOpen' } } }],
		{ new: true },
	);
	// 해당 가게를 즐겨찾기한 사용자 ID 목록 조회
	const bookmarkedUsers = await getBookmarkedUserIds(storeId);

	let notification;
	if (store!.isOpen) {
		notification = new Notification({
			recipients: bookmarkedUsers,
			sender: storeId,
			type: 'open',
			content: `${store?.category}가게가 영업을 시작했습니다`,
		});
	} else {
		notification = new Notification({
			recipients: bookmarkedUsers,
			sender: storeId,
			type: 'closed',
			content: `${store?.category}가게가 영업을 마감했습니다`,
		});
	}

	const savedNotification = await notification.save();

	wss.clients.forEach((client) => {
		const wsClient = client as WebSocketWithUserId;
		if (
			client.readyState === WebSocket.OPEN &&
			bookmarkedUsers.includes(wsClient.userId)
		) {
			client.send(
				JSON.stringify({
					type: 'NEW_NOTIFICATION',
					data: savedNotification,
				}),
			);
		}
	});

	return savedNotification;
};

export const getNotification = async (userId: string) => {
	const bookmark = await Bookmark.findOne({
		userId: new Types.ObjectId(userId),
	}).select('storeId');
	if (!bookmark) {
		return [];
	}
	const storeId = bookmark.storeId;

	const notifications = await Notification.find({ sender: storeId });
	return notifications;
};
