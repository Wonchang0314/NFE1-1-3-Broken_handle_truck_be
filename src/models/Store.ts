import moment from 'moment';
import mongoose, { Schema, Types } from 'mongoose';

export interface IStore {
	name: string;
	ownerId: Types.ObjectId;
	coordinates: number[];
	isOpen: boolean;
	category: string;
	paymentMethod: ('현금' | '카드' | '계좌이체')[];
	createdAt: string;
	updatedAt?: string;
}

const storeSchema = new Schema({
	name: { type: String, required: true },
	ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	coordinates: [{ type: Number }],
	isOpen: { type: Boolean, default: false },
	category: { type: String, required: true },
	paymentMethod: [{ type: String, enum: ['현금', '카드', '계좌이체'] }],
	createdAt: { type: String, deafult: moment().format('YYYY-MM-DD HH:mm') },
	updatedAt: { type: String, default: moment().format('YYYY-MM-DD HH:mm') },
});

storeSchema.index({ coordinates: '2dsphere' });

const Store = mongoose.model<IStore & mongoose.Document>('Store', storeSchema);
export default Store;
