import { IStore } from '@/models/Store';
import { Store, Comment, User } from '@/models';
import { AppError } from '@/utils';
import mongoose from 'mongoose';
import Bookmark from '@/models/Bookmark';
import Notification from '@/models/Notification';

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

	const stores = await Store.aggregate([
		{ $match: queries },
		{
			$lookup: {
				from: 'comments',
				localField: '_id',
				foreignField: 'storeId',
				as: 'comments',
			},
		},
		{
			$addFields: {
				commentCount: { $size: '$comments' },
			},
		},
		{
			$project: {
				comments: 0,
			},
		},
	]);

	if (!stores)
		throw new AppError('Store 데이터를 불러오는데 실패했습니다', 500);

	return stores;
};

export const postStore = async (data: IStore) => {
	let store = await Store.findOne({ ownerId: data.ownerId });

	if (!store) {
		const newStore = new Store(data);
		store = await newStore.save();

		const user = await User.findByIdAndUpdate(data.ownerId, { role: 'owner' });

		if (!user)
			throw new AppError('스토어 등록시 사용자 정보를 찾을 수 없습니다.', 404);
	} else {
		store = await Store.findByIdAndUpdate(
			store._id,
			{
				name: data.name,
				coordinates: data.coordinates,
				category: data.category,
				paymentMethod: data.paymentMethod,
			},
			{ new: true },
		);
	}

	if (!store) throw new AppError('스토어 등록에 실패했습니다.', 500);

	const comments = await Comment.find({ storeId: store.id }).populate(
		'authorId',
		['_id', 'nickname'],
	);

	return { store, comments };
};

export const getStore = async (ownerId: string) => {
	const store = await Store.findOne({ ownerId });

	if (store) {
		const comments = await Comment.find({ storeId: store.id }).populate(
			'authorId',
			['_id', 'nickname'],
		);

		return { store, comments };
	}

	return { store, comments: [] };
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

		await Bookmark.deleteMany({
			storeId: store.id,
		}).session(session);

		// 확장성 고려 DeleteMany 사용
		await Notification.deleteMany({ sender: store.id }).session(session);

		await Store.findByIdAndDelete(store.id).session(session);

		await User.findByIdAndUpdate(ownerId, {
			$set: { role: 'user' },
		}).session(session);

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

	const comments = await Comment.find({ storeId: store.id }).populate(
		'authorId',
		['_id', 'nickname'],
	);

	return { store, comments };
};
