import { Router } from 'express';
import {
	getCommentController,
	postCommentController,
	deleteCommentController,
} from './controller';

const commentRouter = Router();

commentRouter.route('/').get(getCommentController);
commentRouter.route('/').post(postCommentController);
commentRouter.route('/').delete(deleteCommentController);

export default commentRouter;
