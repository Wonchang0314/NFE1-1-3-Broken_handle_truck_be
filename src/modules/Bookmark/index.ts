import { authHandler } from '@/middlewares';
import { Router } from 'express';
import { postBookMarkController } from './controller';

const bookmarkRouter = Router();

bookmarkRouter.route('/').all(authHandler).post(postBookMarkController);

export default bookmarkRouter;
