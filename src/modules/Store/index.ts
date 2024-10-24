import { Router } from 'express';
import { getStoresController } from './controller';

const storeRouter = Router();

storeRouter.get('/stores', getStoresController);

export default storeRouter;
