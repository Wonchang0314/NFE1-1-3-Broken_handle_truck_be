import { Router } from 'express';
import { getStoresController, postStoreController } from './controller';

const storeRouter = Router();

storeRouter.route('/').get(getStoresController);
storeRouter.route('/').post(postStoreController);

export default storeRouter;
