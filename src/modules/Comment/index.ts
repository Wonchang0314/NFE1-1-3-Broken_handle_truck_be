import { Router } from 'express';
import {
	getCommentController,
	postCommentController,
	deleteCommentController,
} from './controller';
import { authHandler } from '@/middlewares';

const commentRouter = Router();

commentRouter
	.route('/')
	.get(getCommentController)
	.all(authHandler)
	.post(postCommentController)
	.delete(deleteCommentController);

export default commentRouter;
