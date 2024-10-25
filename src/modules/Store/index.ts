import { Router } from 'express';
import { getStoresController, postStoreController } from './controller';
import { authHandler } from '@/middlewares';

const storeRouter = Router();

storeRouter.route('/').get(getStoresController);
storeRouter.route('/').all(authHandler).post(postStoreController);

export default storeRouter;
