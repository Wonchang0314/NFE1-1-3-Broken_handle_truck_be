import { Router } from 'express';
import {
	deleteStoreController,
	getStoreByIdController,
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
storeRouter.route('/:storeId([0-9a-f]{24})').get(getStoreByIdController);

export default storeRouter;
