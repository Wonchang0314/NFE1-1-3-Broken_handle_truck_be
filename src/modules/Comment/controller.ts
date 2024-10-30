import { NextFunction, Request, Response } from 'express';
import { deleteComment, getComments, postComment } from './service';
import { AppError } from '@/utils';

export const getCommentController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { storeId } = req.query;
		if (!storeId) {
			throw new AppError('댓글 조회를 위한 storeId 값이 누락되었습니다.', 400);
		}
		const comments = await getComments(storeId as string);
		res.status(200).json({
			msg: 'ok',
			comments,
		});
	} catch (error) {
		next(error);
	}
};

export const postCommentController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const { content, storeId } = req.body;

		if (!user)
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);

		if (!content || !storeId) {
			throw new AppError('댓글 생성을 위해 필요한 값이 누락되었습니다', 400);
		}

		const comment = await postComment(content, storeId, user._id);
		res.status(201).json({
			msg: 'ok',
			comment,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteCommentController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		const { commentId } = req.body;

		if (!user)
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);

		if (!commentId)
			throw new AppError(
				'댓글 삭제를 위한 commentId 값이 누락되었습니다.',
				400,
			);

		const result = await deleteComment(commentId, user._id);

		if (result.deletedCount === 0)
			throw new AppError('댓글 삭제에 실패했습니다.', 500);

		res.status(200).json({
			msg: 'ok',
		});
	} catch (error) {
		next(error);
	}
};
