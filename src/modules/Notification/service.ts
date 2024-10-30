import { Types } from 'mongoose';
import Notification, { INotification } from '@/models/Notification';
import wss from '../webSocketServer';
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
	await Notification.deleteMany({
		storeId: storeId,
	});
	const store = await Store.findOneAndUpdate(
		{ _id: storeId },
		[{ $set: { isOpen: { $not: '$isOpen' } } }],
		{ new: true },
	);
	// 해당 가게를 즐겨찾기한 사용자 ID 목록 조회
	const bookmarkedUserIds = await getBookmarkedUserIds(storeId);
	const bookmarkedUserIdSet = new Set(bookmarkedUserIds);

	let notification;
	if (store!.isOpen) {
		notification = new Notification({
			recipients: bookmarkedUserIds,
			sender: storeId,
			type: 'open',
			content: `${store?.category}가게가 영업을 시작했습니다`,
		});
	} else {
		notification = new Notification({
			recipients: bookmarkedUserIds,
			sender: storeId,
			type: 'closed',
			content: `${store?.category}가게가 영업을 마감했습니다`,
		});
	}

	const savedNotification = await notification.save();

	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
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

export const getNotification = async (storeId: Types.ObjectId) => {};
