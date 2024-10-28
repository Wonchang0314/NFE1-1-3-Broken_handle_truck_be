import { AppError, sendCookie } from '@/utils';
import {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
} from '@/utils/jwt';
import { NextFunction, Request, Response } from 'express';

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			// 1. 액세스 토큰이 없는경우, 리프레시 토큰 확인
			return refreshTokenHandler(req, res, next);
		}

		// 2. 액세스 토큰 검증
		try {
			const decoded = verifyAccessToken(accessToken);
			req.user = decoded as { id: string };

			return next();
		} catch (e) {
			// 3. 액세스 토큰이 만료된 경우, 리프레시 토큰 확인
			if (e instanceof AppError && e.statusCode === 403) {
				return refreshTokenHandler(req, res, next);
			}

			return next(e);
		}
	} catch (e) {
		next(e);
	}
};

const refreshTokenHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			throw new AppError(
				'유효한 인증 토큰이 없습니다. 잘못된 접근입니다.',
				401,
			);
		}

		// 1. 리프레시 토큰 검증
		const decoded = verifyRefreshToken(refreshToken) as { id: string };
		req.user = decoded;

		// 2. 새로운 토큰 발급
		const newAccessToken = generateAccessToken({ id: decoded.id });
		const newRefreshToken = generateRefreshToken({ id: decoded.id });

		// 3. 새로운 토큰을 쿠키에 설정
		sendCookie(res, 'accessToken', newAccessToken, 1);
		sendCookie(res, 'refreshToken', newRefreshToken, 24);

		next();
	} catch (e) {
		next(e);
	}
};

export default authHandler;
