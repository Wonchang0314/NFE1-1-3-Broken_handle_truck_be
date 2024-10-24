import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { getStores, postStore } from './service';
import mongoose from 'mongoose';
import { IStore } from '@/models/Store';

export const getStoresController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { coordinates } = req.body;
		if (!coordinates) {
			throw new Error('위도와 경도를 제공해야 합니다');
		}
		const stores = await getStores(coordinates[0], coordinates[1]);
		res.status(200).json(stores);
	} catch (error) {
		next(error);
	}
	return;
};

export const postStoreController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { coordinates, isOpen, category, paymentMethod } = req.body;
		if (!coordinates || !category || !paymentMethod) {
			throw new Error('가게 등록을 위한 정보가 누락되었습니다');
		}
		const newStore: IStore = {
			ownerId: new mongoose.Types.ObjectId(),
			coordinates: coordinates,
			isOpen: isOpen,
			category: category,
			paymentMethod: paymentMethod,
			createdAt: moment().format('YYYY-MM-DD HH:mm'),
			updatedAt: moment().format('YYYY-MM-DD HH:mm'),
		};
		const response = await postStore(newStore, next);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
