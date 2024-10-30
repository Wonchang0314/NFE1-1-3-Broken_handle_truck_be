import { Router } from 'express';
import {
	checkEmailController,
	deleteUserController,
	kakaoCallbackController,
	kakaoLoginController,
	localLogin,
	localRegister,
	logout,
} from './controller';
import { authHandler } from '@/middlewares';

const authRouter = Router();

// @route	POST /api/auth/register
// @desc	회원가입
authRouter.route('/register').post(localRegister);

// @route GET /api/auth/check-email
// @desc	이메일 중복확인
authRouter.route('/check-email').get(checkEmailController);

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

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     description: 이메일과 비밀번호, 닉네임을 통해 회원가입을 수행하고 JWT 토큰을 쿠키로 전송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 (필수)
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호 (필수)
 *                 example: "password123"
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임 (필수)
 *                 example: "user_nickname"
 *     responses:
 *       201:
 *         description: 성공
 *         headers:
 *           refreshToken:
 *             description: JWT AccessToken을 쿠키에 설정
 *             schema:
 *               type: string
 *           accessToken:
 *             description: JWT RefreshToken을 쿠키에 설멍
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사용자 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     nickname:
 *                       type: string
 *                       description: 사용자 닉네임
 *                       example: "user_nickname"
 *                     role:
 *                       type: string
 *                       enum: ["user", "owner"]
 *                       description: 사용자 권한
 *                       example: "user"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 오류 메시지
 *                   example: "모든 필드 요소는 필수 입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 서버 오류 메시지
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인
 *     description: 이메일과 비밀번호로 로그인을 수행하고 JWT 토큰을 쿠키로 전송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일 (필수)
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호 (필수)
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 성공
 *         headers:
 *           refreshToken:
 *             description: JWT AccessToken을 쿠키에 설정
 *             schema:
 *               type: string
 *           accessToken:
 *             description: JWT RefreshToken을 쿠키에 설정
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사용자 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     nickname:
 *                       type: string
 *                       description: 사용자 닉네임
 *                       example: "user_nickname"
 *                     role:
 *                       type: string
 *                       enum: ["user", "owner"]
 *                       description: 사용자 권한
 *                       example: "user"
 *       400:
 *         description: 필수 입력값 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 오류 메시지
 *                   example: "모든 필드 요소는 필수 입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 서버 오류 메시지
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: 로그아웃
 *     description: 로그인 후 접근 가능한 로그아웃 엔드포인트입니다. accessToken과 refreshToken 쿠키를 만료 처리합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *         headers:
 *           refreshToken:
 *             description: JWT 토큰 만료 설정
 *             schema:
 *               type: string
 *           accessToken:
 *             description: JWT 토큰 만료 설정
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *       401:
 *         description: 인증 실패 (로그인 필요)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 인증 실패 메시지
 *                   example: "사용자 인증 정보가 없습니다. 잘못된 접근입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 서버 오류 메시지
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 */

/**
 * @swagger
 * /auth/check-email:
 *   get:
 *     tags: [Auth]
 *     summary: 이메일 중복 확인
 *     description: 이메일이 이미 사용 중인지 확인합니다.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: 이메일 (필수)
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 isAble:
 *                   type: boolean
 *                   description: true일 경우 사용 가능
 *                   example: true
 *       409:
 *         description: 중복된 이메일
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 isAble:
 *                   type: boolean
 *                   description: true일 경우 사용 가능
 *                   example: false
 *       400:
 *         description: 잘못된 요청 (필수 파라미터 누락)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 오류 메시지
 *                   example: "이메일 필드는 필수 요소 입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: 서버 오류 메시지
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 */

/**
 * @swagger
 * /auth/kakao:
 *   get:
 *     tags: [Auth]
 *     summary: 카카오 로그인
 *     description: 카카오 로그인 페이지로 리다이렉트됩니다. 직접 URL로 접근해야 합니다.
 *     responses:
 *       302:
 *         description: 성공 (홈페이지로 리다이렉트 됩니다.)
 *         headers:
 *           refreshToken:
 *             description: JWT AccessToken을 쿠키에 설정
 *             schema:
 *               type: string
 *           accessToken:
 *             description: JWT RefreshToken을 쿠키에 설정
 *             schema:
 *               type: string
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "카카오 인증 중 오류가 발생했습니다."
 */

/**
 * @swagger
 * /auth/delete:
 *   delete:
 *     tags: [Auth]
 *     summary: 회원 탈퇴
 *     description: 로그인 후 접근 가능한 회원 탈퇴 엔드포인트로, accessToken과 refreshToken 쿠키를 만료 처리합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공
 *         headers:
 *           refreshToken:
 *             description: JWT 토큰 만료 설정
 *             schema:
 *               type: string
 *           accessToken:
 *             description: JWT 토큰 만료 설정
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "사용자 인증 정보가 없습니다. 잘못된 접근입니다."
 *       404:
 *         description: 사용자 정보를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "사용자 정보를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "회원 탈퇴 중 오류가 발생했습니다. 모든 작업이 원복됩니다."
 */
