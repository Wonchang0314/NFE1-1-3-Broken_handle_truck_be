import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { AppError } from '@/utils';
import moment from 'moment';

export interface IComment extends Document {
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
	password: { type: String, required: true },
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;

commentSchema.pre('save', async function (next) {
	const comment = this as IComment;

	if (!comment.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		comment.password = await bcrypt.hash(comment.password, salt);
		next();
	} catch (e) {
		if (e instanceof AppError) {
			next(e);
		} else {
			next(new AppError('비밀번호 해싱 중 오류가 발생했습니다', 500));
		}
	}
});
