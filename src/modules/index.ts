import { Router } from 'express';
import authRouter from './Auth';
import storeRouter from './Store';

const apiRouter = Router();

/* 라우팅 경로 추가 */
apiRouter.use('/auth', authRouter);
apiRouter.use('/store', storeRouter);

export default apiRouter;
