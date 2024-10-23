import { AppError } from '@/utils';
import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err instanceof AppError) {
		console.error(`status: ${err.statusCode}`, `message: ${err.message}`);
		res.status(err.statusCode).json({ msg: err.message });
		return;
	}

	console.error('알 수 없는 서버 오류가 발생했습니다.', err);
	res.status(500).json({ msg: '알 수 없는 서버 오류가 발생했습니다.' });
	return;
};

export default errorHandler;
