import { Comment } from '@/models';
import mongoose from 'mongoose';

export const getComments = async (storeId: mongoose.Types.ObjectId) => {
	return await Comment.find({ storeId });
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

export const deleteComment = async (givenId: mongoose.Types.ObjectId) => {
	return await Comment.deleteOne({ _id: givenId });
};
