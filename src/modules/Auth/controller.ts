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
		});
	} catch (e) {
		next(e);
	}
};
