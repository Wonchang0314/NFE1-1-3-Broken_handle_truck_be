import moment from 'moment';
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INotification extends Document {
	recipients: string[];
	sender: Types.ObjectId;
	type: 'open' | 'closed';
	createdAt?: string;
	updatedAt?: string;
	isRead?: boolean;
}

const notificationSchema = new Schema<INotification>({
	recipients: [{ type: String, required: true }],
	sender: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
	type: { type: String, enum: ['open', 'closed'], required: true },
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
	updatedAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
	isRead: {
		type: Boolean,
		default: false,
	},
});

const Notification = mongoose.model<INotification>(
	'Notification',
	notificationSchema,
);
export default Notification;
