import moment from 'moment';
import mongoose, { Document, Schema, Types } from 'mongoose';

export interface INotification extends Document {
	recipients: string[];
	sender: Types.ObjectId;
	type: 'open' | 'closed';
	content: string;
	createdAt?: string;
	updatedAt?: string;
}

// Notification 스키마 정의
const notificationSchema = new Schema<INotification>({
	recipients: [{ type: String, required: true }],
	sender: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
	type: { type: String, enum: ['open', 'closed'], required: true },
	content: { type: String, required: true },
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
	updatedAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
});

const Notification = mongoose.model<INotification>(
	'Notification',
	notificationSchema,
);
export default Notification;
