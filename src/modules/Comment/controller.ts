import { NextFunction, Request, Response } from 'express';
import { deleteComment, getComments, postComment } from './service';
import { AppError } from '@/utils';

export const getCommentController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { storeId } = req.body;
		if (!storeId) {
			throw new AppError('가게ID가 빈채로 요청되었습니다', 400);
		}
		const comments = await getComments(storeId);
		res.status(200).json(comments);
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
		const { content, password, storeId } = req.body;
		if (!content || !storeId || !password) {
			throw new AppError('댓글 생성을 위해 필요한 값이 누락되었습니다', 400);
		}

		const comment = await postComment(content, password, storeId);
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
		const { commentId, commentPW } = req.body;
		if (!commentId || !commentPW)
			throw new AppError(
				'댓글 삭제를 위한 commentId, commentPW 값이 누락되었습니다.',
				400,
			);

		const comment = await deleteComment(commentId, commentPW);
		if (comment.deletedCount === 0) {
			next(new AppError('댓글을 찾을 수 없습니다', 404));
		}

		res.status(200).json({
			msg: 'ok',
			comment,
		});
	} catch (error) {
		next(error);
	}
};
