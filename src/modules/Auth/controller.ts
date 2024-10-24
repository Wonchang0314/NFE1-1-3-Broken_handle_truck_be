import { AppError } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import { localLoginUser, localRegisterUser } from './service';

// 회원가입
export const localRegister = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		// 1. 간단한 유효성 검사
		if (!email || !password)
			throw new AppError('모든 필드 요소는 필수 입니다.', 400);

		// 2. 회원가입 로직 호출
		const { accessToken, refreshToken, user } = await localRegisterUser(
			email,
			password,
		);

		// 3. 토큰 쿠기 전송
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: 'lax',
		});
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
			sameSite: 'lax',
		});

		// 4. 응답 전송
		res.status(200).json({
			userId: user,
			msg: '회원가입이 완료되었습니다.',
		});
	} catch (e) {
		next(e);
	}
};

// 로그인
export const localLogin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password } = req.body;

		// 1. 간단한 유효성 검사
		if (!email || !password)
			throw new AppError('모든 필드 요소는 필수 입니다.', 400);

		// 2. 로그인 로직 호출
		const { accessToken, refreshToken, user } = await localLoginUser(
			email,
			password,
		);

		// 3. 토큰 쿠기 전송
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: 'lax',
		});
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			maxAge: 60 * 60 * 1000,
			sameSite: 'lax',
		});

		// 4. 응답 전송
		res.status(200).json({
			userId: user,
			msg: '로그인이 완료되었습니다.',
		});
	} catch (e) {
		next(e);
	}
};

// 로그아웃
export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// 1. 토큰 쿠키 만료 설정
		res.cookie('refreshToken', '', {
			httpOnly: true,
			sameSite: 'lax',
			expires: new Date(0),
		});
		res.cookie('accessToken', '', {
			httpOnly: true,
			sameSite: 'lax',
			expires: new Date(0),
		});

		res.status(200).json({
			msg: '로그아웃 되었습니다.',
		});
	} catch (e) {
		const customError = new AppError('로그아웃에 실패 했습니다.', 500);
		next(customError);
	}
};
