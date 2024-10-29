import { Router } from 'express';
import {
	deleteUserController,
	kakaoCallbackController,
	kakaoLoginController,
	localLogin,
	localRegister,
	logout,
} from './controller';
import { authHandler } from '@/middlewares';

const authRouter = Router();

// @route	POST /api/auth/login
// @desc	회원가입
authRouter.route('/register').post(localRegister);

// @route	POST /api/auth/login
// @desc	로그인
authRouter.route('/login').post(localLogin);

// @route	POST /api/auth/logout
// @desc	로그아웃
authRouter.route('/logout').all(authHandler).post(logout);

// @route POST /api/auth/delete
// @desc	회원탈퇴
authRouter.route('/delete').all(authHandler).delete(deleteUserController);

// @route	GET /api/auth/kakao
// @desc	카카오로그인
authRouter.route('/kakao').get(kakaoLoginController);

// @route GET /api/auth/kakao/callback
authRouter.route('/kakao/callback').get(kakaoCallbackController);

export default authRouter;
