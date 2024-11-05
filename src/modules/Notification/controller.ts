import { NextFunction, Request, Response } from 'express';
import {
	postNotification,
	getNotification,
	postAsRead,
	postAsReadAll,
} from './service';
import { AppError } from '@/utils';

export const postNotificationController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;

		if (!user) {
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);
		}

		const notification = await postNotification(user._id);
		res.status(201).json({
			msg: 'ok',
			notification,
		});
	} catch (error) {
		next(error);
	}
};

export const getNotificationController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		if (!user) {
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);
		}
		const notifications = await getNotification(user._id);
		res.status(200).json({
			msg: 'ok',
			notifications,
		});
	} catch (error) {
		next(error);
	}
};

export const postAsReadController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { notificationId } = req.body;
		if (!notificationId) {
			throw new AppError('알림 ID가 누락되었습니다', 400);
		}
		await postAsRead(notificationId);
		res.status(201).json({ msg: 'ok' });
	} catch (error) {
		next(error);
	}
};

export const postAsReadAllController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;
		if (!user) {
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);
		}
		await postAsReadAll(user._id);
		res.status(201).json({ msg: 'ok' });
	} catch (error) {
		next(error);
	}
};
