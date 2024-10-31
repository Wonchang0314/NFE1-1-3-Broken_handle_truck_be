import { Response } from 'express';
import config from '@/config';
const { NODE_ENV } = config;
/**
 * 쿠키 설정 함수
 * @param res - Express Response
 * @param name - 쿠키 이름
 * @param value - 쿠키 값
 * @param maxAge - 쿠키 유효기간 (시간 단위)
 */
const sendCookie = (
	res: Response,
	name: string,
	value: string,
	maxAge: number,
) => {
	res.cookie(name, value, {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
		maxAge: maxAge * 60 * 60 * 1000,
	});
};

export default sendCookie;
