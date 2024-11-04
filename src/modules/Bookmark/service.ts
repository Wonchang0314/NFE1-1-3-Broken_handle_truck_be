import Bookmark from '@/models/Bookmark';
import { AppError } from '@/utils';
import { Types } from 'mongoose';

// 북마크 (등록, 취소) 로직
export const postBookMark = async (userId: string, storeId: string) => {
	let bookmark = await Bookmark.findOne({ userId, storeId });

	if (bookmark) {
		await Bookmark.findByIdAndDelete(bookmark.id);

		return null;
	}

	const newBookMark = new Bookmark({
		userId,
		storeId,
	});

	bookmark = await newBookMark.save();
	if (!bookmark) throw new AppError('북마크 생성 중 오류가 발생했습니다.', 500);

	return bookmark;
};

// 북마크 조회(사용자 입장) 로직
export const getBookmarkbyUser = async (userId: string) => {
	const bookmarks = await Bookmark.aggregate([
		{ $match: { userId: new Types.ObjectId(userId) } }, // 사용자의 북마크 필터링
		{
			$lookup: {
				from: 'stores', // Store 컬렉션과 조인
				localField: 'storeId',
				foreignField: '_id',
				as: 'storeInfo',
			},
		},
		{ $unwind: '$storeInfo' }, // storeInfo 배열을 단일 객체로 변환
		{
			$lookup: {
				from: 'comments', // Comment 컬렉션과 조인
				let: { storeId: '$storeId' },
				pipeline: [
					{ $match: { $expr: { $eq: ['$storeId', '$$storeId'] } } }, // storeId로 필터링
					{ $count: 'commentCount' }, // 댓글 개수 카운트
				],
				as: 'commentData',
			},
		},
		{
			$addFields: {
				comments: {
					$ifNull: [{ $arrayElemAt: ['$commentData.commentCount', 0] }, 0],
				}, // 댓글 개수가 없으면 0으로 설정
			},
		},
		{
			$project: {
				_id: 1,
				storeId: '$storeInfo._id',
				name: '$storeInfo.name',
				isOpen: '$storeInfo.isOpen',
				category: '$storeInfo.category',
				comments: 1,
			},
		},
	]);

	return bookmarks;
};
