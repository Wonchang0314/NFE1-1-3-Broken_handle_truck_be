import { IComment } from '@/models/Comment';
import { Comment } from '@/models';
import mongoose from 'mongoose';
import moment from 'moment';

export const getComments = async (storeId: mongoose.Types.ObjectId) => {
	return await Comment.find({ storeId });
};

export const postComment = async (
	content: string,
	password: string,
	storeId: mongoose.Types.ObjectId,
) => {
	const newComment: IComment = {
		storeId: storeId,
		content: content,
		password: password,
		createdAt: moment().format('YYYY-MM-DD HH:mm'),
	};
	return await Comment.create(newComment);
};

export const deleteComment = async (givenId: mongoose.Types.ObjectId) => {
	return await Comment.deleteOne({ _id: givenId });
};
