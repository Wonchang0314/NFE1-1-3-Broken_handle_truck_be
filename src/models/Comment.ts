import mongoose, { Document, Schema, Types } from 'mongoose';
import moment from 'moment';

export interface IComment extends Document {
	authorId: Types.ObjectId;
	storeId: Types.ObjectId;
	content: string;
	createdAt: string;
}

const commentSchema = new Schema({
	authorId: {
		type: Types.ObjectId,
		ref: 'User',
		required: true,
	},
	storeId: {
		type: Types.ObjectId,
		ref: 'Store',
		required: true,
	},
	content: { type: String, required: true },
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
