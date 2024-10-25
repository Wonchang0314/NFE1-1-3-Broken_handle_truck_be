import { IStore } from '@/models/Store';
import { Store } from '@/models';
import { AppError } from '@/utils';

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
