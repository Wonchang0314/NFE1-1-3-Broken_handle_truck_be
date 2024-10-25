import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { getStores, postStore } from './service';
import mongoose from 'mongoose';
import { IStore } from '@/models/Store';
import { AppError } from '@/utils';

export const getStoresController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { lat, lon } = req.query;

		if (!lat || !lon)
			throw new AppError('위도, 경도 정보가 누락된 요청입니다.', 400);

		const stores = await getStores(Number(lat), Number(lon));
		res.status(200).json({
			msg: 'ok',
			stores,
		});
	} catch (error) {
		next(error);
	}
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
