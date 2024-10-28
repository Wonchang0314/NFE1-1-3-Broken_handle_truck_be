import { IStore } from '@/models/Store';
import { Store, Comment } from '@/models';
import { AppError } from '@/utils';
import mongoose from 'mongoose';

export const getStores = async (
	latitude: number = 0,
	longitude: number = 0,
) => {
	const radiusInKm = 1;
	const earthRadiusInKm = 6378.1;
	const stores = await Store.find({
		coordinates: {
			$geoWithin: {
				$centerSphere: [[latitude, longitude], radiusInKm / earthRadiusInKm],
			},
		},
	});

	if (!stores)
		throw new AppError('Store 데이터를 불러오는데 실패했습니다', 500);

	return stores;
};

export const postStore = async (newStore: IStore) => {
	const updatedStore = await Store.findOneAndUpdate(
		{
			ownerId: newStore.ownerId, // ownerId 같으면 교체
		},
		{
			$set: {
				coordinates: newStore.coordinates,
				isOpen: newStore.isOpen,
				category: newStore.category,
				paymentMethod: newStore.paymentMethod,
				updatedAt: newStore.updatedAt,
			},
			$setOnInsert: {
				createdAt: newStore.createdAt,
			},
		},
		{
			upsert: true, // 없으면 업데이트
			new: true,
		},
	);

	if (!updatedStore) throw new AppError('Store 등록에 실패했습니다', 500);

	return updatedStore;
};

export const getStore = async (ownerId: string) => {
	const store = await Store.findOne({ ownerId });

	return store;
};

export const deleteStore = async (ownerId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	const store = await Store.findOne({ ownerId });
	if (!store) throw new AppError('Store가 존재하지 않습니다.', 404);

	const deletedComments = await Comment.deleteMany({
		storeId: store.id,
	}).session(session);
	if (!deletedComments)
		throw new AppError('Store와 관련된 Comments 삭제에 실패했습니다', 500);

	const deletedStore = await Store.findOneAndDelete({ id: store.id }).session(
		session,
	);
	if (!deletedStore) throw new AppError('Store 삭제에 실패했습니다.', 500);

	await session.commitTransaction();
	session.endSession();
};
