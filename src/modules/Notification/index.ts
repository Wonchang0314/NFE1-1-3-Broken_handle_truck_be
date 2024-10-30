import { Router } from 'express';
import {
	postNotificationController,
	getNotificationController,
} from './controller';
import authHandler from '@/middlewares/authHandler';

const notificationRouter = Router();

notificationRouter
	.route('/')
	.all(authHandler)
	.get(getNotificationController)
	.post(postNotificationController);

export default notificationRouter;
