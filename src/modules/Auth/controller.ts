import { AppError, clearCookie, sendCookie } from '@/utils';
import { NextFunction, Request, Response } from 'express';
import {
	checkEmail,
	deleteUser,
	kakaoLogin,
	localLoginUser,
	localRegisterUser,
} from './service';
import config from '@/config';
import { getKakaoToken, getKakaoUser } from '@/utils/kakao';

const { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI, FRONT_BASE_URL } = config;

// 회원가입
export const localRegister = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, password, nickname } = req.body;

		// 1. 간단한 유효성 검사
		if (!email || !password || !nickname)
			throw new AppError('모든 필드 요소는 필수 입니다.', 400);

		// 2. 회원가입 로직 호출
		const { accessToken, refreshToken, user } = await localRegisterUser(
			email,
			password,
			nickname,
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

// 이메일 중복체크
export const checkEmailController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email } = req.query;

		if (!email) throw new AppError('이메일 필드는 필수 요소 입니다.', 400);

		const useAble = await checkEmail(email as string);

		res.status(200).json({
			msg: 'ok',
			useAble,
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
		if (e instanceof AppError) {
			next(e);
		} else {
			next(new AppError('로그아웃에 실패 했습니다.', 500));
		}
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

		await deleteUser(user._id);

		clearCookie(res, 'refreshToken');
		clearCookie(res, 'accessToken');

		res.status(200).json({
			msg: 'ok',
		});
	} catch (e) {
		next(e);
	}
};

export const kakaoLoginController = async (req: Request, res: Response) => {
	const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

	res.redirect(url);
};

export const kakaoCallbackController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const code = req.query.code as string;

		const token = await getKakaoToken(code);
		if (!token) throw new AppError('카카오 인증 토큰 발급에 실패했습니다', 500);

		const userData = await getKakaoUser(token);
		if (!userData)
			throw new AppError('카카오 사용자 데이터 수신에 실패했습니다', 500);

		const { accessToken, refreshToken } = await kakaoLogin(userData);

		sendCookie(res, 'accessToken', accessToken, 1);
		sendCookie(res, 'refreshToken', refreshToken, 24);

		res.redirect(FRONT_BASE_URL || 'http://localhost:5173');
	} catch (e) {
		if (e instanceof AppError) {
			next(e);
		} else {
			next(new AppError('카카오 인증 중 오류가 발생했습니다.', 500));
		}
	}
};
