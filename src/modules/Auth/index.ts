import { Router } from 'express';

const authRouter = Router();

// @route	POST /api/auth/login
// @desc	회원가입
authRouter.route('/register').post();

// @route	POST /api/auth/login
// @desc	로그인
authRouter.route('/login').post();

// @route	POST /api/auth/logout
// @desc	로그아웃
authRouter.route('/logout').post();

// @route POST /api/auth/delete
// @desc	회원탈퇴
authRouter.route('/delete').post();

export default authRouter;
