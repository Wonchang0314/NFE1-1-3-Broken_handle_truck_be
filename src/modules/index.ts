import { Router } from 'express';
import authRouter from './Auth';

const apiRouter = Router();

/* 라우팅 경로 추가 */
apiRouter.use('/auth', authRouter);

export default apiRouter;
