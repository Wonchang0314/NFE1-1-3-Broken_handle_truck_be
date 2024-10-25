import { Router } from 'express';
import authRouter from './Auth';
import storeRouter from './Store';
import commentRouter from './Comment';

const apiRouter = Router();

/* 라우팅 경로 추가 */
apiRouter.use('/auth', authRouter);
apiRouter.use('/store', storeRouter);
apiRouter.use('/store/comment', commentRouter);

export default apiRouter;
