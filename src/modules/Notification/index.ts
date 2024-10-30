import { Router } from 'express';
import { postNotificationController } from './controller';

const notificationRouter = Router();

notificationRouter.route('/').post(postNotificationController);

export default notificationRouter;
