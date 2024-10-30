import { AppError } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import { getBookmarkbyUser, postBookMark } from './service';

// 북마크 등록, 취소
export const postBookMarkController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const { storeId } = req.body;

		if (!user)
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);

		if (!storeId)
			throw new AppError(
				'북마크 등록을 위한 storeId 값이 누락되었습니다.',
				400,
			);

		const bookmark = await postBookMark(user._id, storeId);

		res.status(200).json({
			msg: 'ok',
			bookmark,
		});
	} catch (e) {
		next(e);
	}
};

// 북마크 조회(사용자 입장)
export const getBookmarkByUserController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;

		if (!user)
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);

		const bookmarks = await getBookmarkbyUser(user._id);

		res.status(200).json({
			msg: 'ok',
			bookmarks,
		});
	} catch (e) {
		next(e);
	}
};
