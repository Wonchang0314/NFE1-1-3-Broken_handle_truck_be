import { Router } from 'express';
import authRouter from './Auth';
import storeRouter from './Store';
import commentRouter from './Comment';
import notificationRouter from './Notification';
import bookmarkRouter from './Bookmark';

const apiRouter = Router();

/* 라우팅 경로 추가 */
apiRouter.use('/auth', authRouter);
apiRouter.use('/store', storeRouter);
apiRouter.use('/comment', commentRouter);
apiRouter.use('/notification', notificationRouter);
apiRouter.use('/bookmark', bookmarkRouter);

export default apiRouter;
