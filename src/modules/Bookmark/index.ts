import { authHandler } from '@/middlewares';
import { Router } from 'express';
import {
	getBookmarkByUserController,
	postBookMarkController,
} from './controller';

const bookmarkRouter = Router();

bookmarkRouter
	.route('/')
	.all(authHandler)
	.get(getBookmarkByUserController)
	.post(postBookMarkController);

export default bookmarkRouter;
