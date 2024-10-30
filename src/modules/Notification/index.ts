import { Router } from 'express';
import {
	postNotificationController,
	getNotificationController,
} from './controller';

const notificationRouter = Router();

notificationRouter.route('/').post(postNotificationController);
notificationRouter.route('/').get(getNotificationController);

export default notificationRouter;
