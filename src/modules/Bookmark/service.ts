import Bookmark from '@/models/Bookmark';
import { AppError } from '@/utils';

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
