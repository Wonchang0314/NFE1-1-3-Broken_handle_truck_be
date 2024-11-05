import { Response } from 'express';
import config from '@/config';
const { NODE_ENV } = config;

/**
 * 쿠키 제거 함수
 * @param res - Express Response
 * @param name - 만료시킬 쿠키 이름
 */
const clearCookie = (res: Response, name: string) => {
	res.cookie(name, '', {
		httpOnly: true,
		secure: NODE_ENV === 'production',
		sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
		expires: new Date(0),
	});
};

export default clearCookie;
