import jwt from 'jsonwebtoken';
import config from '@/config';
import AppError from './AppError';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = config;

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
 * Refresh Token 검증 함수
 */
export const verifyAccessToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_ACCESS_SECRET as string);
	} catch (e) {
		throw new AppError('유효하지 않은 Refresh Token입니다.', 403);
	}
};

/**
 * Refresh Token 검증 함수
 */
export const verifyRefreshToken = (token: string) => {
	try {
		return jwt.verify(token, JWT_REFRESH_SECRET as string);
	} catch (e) {
		throw new AppError('유효하지 않은 Refresh Token입니다.', 403);
	}
};
