import { Router } from 'express';
import {
	getCommentController,
	postCommentController,
	deleteCommentController,
} from './controller';

const commentRouter = Router();

commentRouter
	.route('/')
	.get(getCommentController)
	.post(postCommentController)
	.delete(deleteCommentController);

export default commentRouter;
