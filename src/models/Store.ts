import mongoose, { Schema, Types } from 'mongoose';

export interface IStore {
	ownerId: Types.ObjectId;
	coordinates: number[];
	isOpen: boolean;
	category: string;
	paymentMethod: ('현금' | '카드' | '계좌이체')[];
	createdAt: string;
	updatedAt?: string;
}

const storeSchema = new Schema({
	ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	coordinates: [{ type: Number }],
	isOpen: { type: Boolean, default: false },
	category: { type: String, required: true },
	paymentMethod: [{ type: String, enum: ['현금', '카드', '계좌이체'] }],
	createdAt: { type: String, required: true },
	updatedAt: { type: String },
});

storeSchema.index({ coordinates: '2dsphere' });

const Store = mongoose.model<IStore & mongoose.Document>('Store', storeSchema);
export default Store;
