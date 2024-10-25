import mongoose, { Schema, Types } from 'mongoose';
import { IUser } from './User';

export interface IComment {
	storeId: Types.ObjectId;
	content: string;
	password: string;
	createdAt: string;
}

const commentSchema = new Schema({
	storeId: {
		type: Schema.Types.ObjectId,
		ref: 'Store',
		required: true,
	},
	content: { type: String, required: true },
	password: { type: String, required: false },
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
