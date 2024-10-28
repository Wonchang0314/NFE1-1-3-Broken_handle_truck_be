import { Comment } from '@/models';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { AppError } from '@/utils';

export const getComments = async (storeId: string) => {
	return await Comment.find({ storeId }).select('-password');
};

export const postComment = async (
	content: string,
	password: string,
	storeId: mongoose.Types.ObjectId,
) => {
	const newComment = new Comment({
		storeId,
		password,
		content,
	});
	const comment = await newComment.save();

	return comment;
};

export const deleteComment = async (
	commentId: mongoose.Types.ObjectId,
	commentPW: string,
) => {
	const comment = await Comment.findById(commentId);
	if (!comment) throw new AppError('댓글을 찾을 수 없습니다.', 404);

	const isMatch = await bcrypt.compare(commentPW, comment.password);
	if (!isMatch) throw new AppError('잘못된 댓글 패스워드 입니다.', 401);

	return await Comment.deleteOne({ _id: commentId });
};
