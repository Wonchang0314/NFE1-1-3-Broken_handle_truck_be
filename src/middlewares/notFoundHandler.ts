import { AppError } from '@/utils';
import { NextFunction, Request, Response } from 'express';

/**
 * 404 에러 처리 핸들러
 * 라우트된 경로를 찾을 수 없을 때 호출.
 */
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const e = new AppError('잘못된 요청 경로 입니다.', 404);
	next(e);
};

export default notFoundHandler;
