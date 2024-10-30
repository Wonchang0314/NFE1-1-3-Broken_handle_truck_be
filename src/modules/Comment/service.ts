import { Comment } from '@/models';
import { AppError } from '@/utils';

export const getComments = async (storeId: string) => {
	return await Comment.find({ storeId }).populate('authorId', [
		'_id',
		'nickname',
	]);
};

export const postComment = async (
	content: string,
	storeId: string,
	authorId: string,
) => {
	const newComment = new Comment({
		storeId,
		content,
		authorId,
	});
	const comment = (await newComment.save()).populate('authorId', [
		'_id',
		'nickname',
	]);

	return comment;
};

export const deleteComment = async (commentId: string, authorId: string) => {
	const comment = await Comment.findOne({ _id: commentId, authorId });
	if (!comment) throw new AppError('댓글을 찾을 수 없습니다.', 404);

	return await Comment.deleteOne({ _id: commentId, authorId });
};
