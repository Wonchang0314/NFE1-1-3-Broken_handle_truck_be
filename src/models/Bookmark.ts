import moment from 'moment';
import { Document, model, Schema, Types } from 'mongoose';

export interface IBookmark extends Document {
	userId: Types.ObjectId;
	storeId: Types.ObjectId;
	createdAt?: string;
}

const bookmarkSchema = new Schema({
	userId: {
		type: Types.ObjectId,
		required: true,
		ref: 'User',
	},
	storeId: {
		type: Types.ObjectId,
		required: true,
		ref: 'Store',
	},
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
});

const Bookmark = model<IBookmark>('Bookmark', bookmarkSchema);

export default Bookmark;
