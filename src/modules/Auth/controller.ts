import { AppError, clearCookie, sendCookie } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import { deleteUser, localLoginUser, localRegisterUser } from './service';

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
		sendCookie(res, 'refreshToken', refreshToken, 24);
		sendCookie(res, 'accessToken', accessToken, 1);

		// 4. 응답 전송
		res.status(200).json({
			msg: 'ok',
			user,
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
		sendCookie(res, 'refreshToken', refreshToken, 24);
		sendCookie(res, 'accessToken', accessToken, 1);

		// 4. 응답 전송
		res.status(200).json({
			msg: 'ok',
			user,
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
		clearCookie(res, 'refreshToken');
		clearCookie(res, 'accessToken');

		res.status(200).json({
			msg: 'ok',
		});
	} catch (e) {
		const customError = new AppError('로그아웃에 실패 했습니다.', 500);
		next(customError);
	}
};

// 회원탈퇴
export const deleteUserController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = req.user;

		if (!user)
			throw new AppError(
				'사용자 인증 정보가 없습니다. 잘못된 접근입니다.',
				401,
			);

		await deleteUser(user.id);

		clearCookie(res, 'refreshToken');
		clearCookie(res, 'accessToken');

		res.status(200).json({
			msg: 'ok',
		});
	} catch (e) {
		next(e);
	}
};
