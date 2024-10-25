import { Router } from 'express';
import {
	deleteStoreController,
	getStoreController,
	getStoresController,
	postStoreController,
} from './controller';
import { authHandler } from '@/middlewares';

const storeRouter = Router();

storeRouter.route('/all').get(getStoresController);
storeRouter
	.route('/')
	.all(authHandler)
	.post(postStoreController)
	.get(getStoreController)
	.delete(deleteStoreController);

export default storeRouter;
