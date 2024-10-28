import { IStore } from '@/models/Store';
import { Store, Comment } from '@/models';
import { AppError } from '@/utils';
import mongoose from 'mongoose';

interface IQueries {
	coordinates: {
		$geoWithin: {
			$centerSphere: [number[], number];
		};
	};
	category?: string;
	name?: { $regex: string; $options: string };
}
export const getStores = async (
	latitude: number = 0,
	longitude: number = 0,
	category?: string,
	name?: string,
) => {
	const radiusInKm = 1;
	const earthRadiusInKm = 6378.1;

	const queries: IQueries = {
		coordinates: {
			$geoWithin: {
				$centerSphere: [[longitude, latitude], radiusInKm / earthRadiusInKm],
			},
		},
	};

	if (category) {
		queries.category = category;
	}

	if (name) {
		queries.name = { $regex: name, $options: 'i' };
	}

	const stores = await Store.find(queries);

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
				name: newStore.name,
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

	if (store) {
		const comments = await Comment.find({ storeId: store.id }).select(
			'-password',
		);

		return { store, comments };
	}

	return { store, comments: null };
};

export const deleteStore = async (ownerId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const store = await Store.findOne({ ownerId });
		if (!store) throw new AppError('Store가 존재하지 않습니다.', 404);

		await Comment.deleteMany({
			storeId: store.id,
		}).session(session);
		await Store.findByIdAndDelete(store.id).session(session);

		await session.commitTransaction();
	} catch (e) {
		await session.abortTransaction();

		if (e instanceof AppError) {
			throw e;
		} else {
			throw new AppError(
				'Store 삭제에 실패했습니다. 모든 작업이 원복됩니다.',
				500,
			);
		}
	} finally {
		session.endSession();
	}
};

export const getStoreById = async (storeId: string) => {
	const store = await Store.findById(storeId);
	if (!store) throw new AppError('Store가 존재하지 않습니다.', 404);

	const comments = await Comment.find({ storeId }).select('-password');

	return { store, comments };
};
