import jwt from 'jsonwebtoken';
import config from '@/config';
import AppError from './AppError';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = config;

export interface IPayload {
	user: {
		_id: string;
		nickname: string;
	};
}

/**
 * Access Token 생성 함수
 */
export const generateAccessToken = (payload: object): string => {
	try {
		return jwt.sign(payload, JWT_ACCESS_SECRET as string, { expiresIn: '1h' });
	} catch (e) {
		throw new AppError('Access Token 생성 중 오류가 발생했습니다.', 500);
	}
};

/**
 * Refresh Token 생성 함수
 */
export const generateRefreshToken = (payload: object): string => {
	try {
		return jwt.sign(payload, JWT_REFRESH_SECRET as string, { expiresIn: '1d' });
	} catch (e) {
		throw new AppError('Refresh Token 생성 중 오류가 발생했습니다.', 500);
	}
};

/**
 * Access Token 검증 함수
 */
export const verifyAccessToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_ACCESS_SECRET as string);
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError)
			throw new AppError('만료된 accessToken 입니다.', 403);
		else if (e instanceof jwt.JsonWebTokenError)
			throw new AppError('유효하지 않은 accessToken 입니다.', 401);
		else
			throw new AppError('토큰 검증 중 알 수 없는 오류가 발생했습니다.', 500);
	}
};

/**
 * Refresh Token 검증 함수
 */
export const verifyRefreshToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_REFRESH_SECRET as string);
	} catch (e) {
		if (e instanceof jwt.TokenExpiredError)
			throw new AppError('만료된 refreshToken 입니다.', 403);
		else if (e instanceof jwt.JsonWebTokenError)
			throw new AppError('유효하지 않은 refreshToken 입니다.', 401);
		else
			throw new AppError('토큰 검증 중 알 수 없는 오류가 발생했습니다.', 500);
	}
};
