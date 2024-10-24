import { IStore } from '@/models/Store';
import { Store } from '@/models';
import { NextFunction } from 'express';

export const getStores = async (
	latitude: number = 0,
	longitude: number = 0,
) => {
	try {
		const radiusInKm = 1;
		const earthRadiusInKm = 6378.1;
		const stores = await Store.find({
			coordinates: {
				$geoWithin: {
					$centerSphere: [[latitude, longitude], radiusInKm / earthRadiusInKm],
				},
			},
		});
		return stores;
	} catch (error) {
		console.log(error);
		throw new Error('데이터를 불러오는데 실패했습니다');
	}
};

export const postStore = async (newStore: IStore, next: NextFunction) => {
	try {
		const updatedStore = await Store.findOneAndUpdate(
			{
				ownerId: newStore.ownerId, // ownerId 같으면 교체
			},
			newStore,
			{
				upsert: true, // 없으면 업데이트
				new: true,
			},
		);

		console.log('가게 생성/업데이트 완료!');
		return updatedStore;
	} catch (error) {
		next(error);
	}
};
