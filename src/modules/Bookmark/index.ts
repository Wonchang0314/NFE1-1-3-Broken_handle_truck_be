import { authHandler } from '@/middlewares';
import { Router } from 'express';
import {
	getBookmarkByUserController,
	postBookMarkController,
} from './controller';

const bookmarkRouter = Router();

bookmarkRouter
	.route('/')
	.all(authHandler)
	.get(getBookmarkByUserController)
	.post(postBookMarkController);

export default bookmarkRouter;

/**
 * @swagger
 * /bookmark:
 *   post:
 *     tags: [Bookmark]
 *     summary: 북마크 등록/취소
 *     description: 로그인 후 스토어를 북마크하거나 기존 북마크를 취소합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeId:
 *                 type: string
 *                 description: 북마크할 스토어의 ID (필수)
 *                 example: "64b9c63f5f5d2a001d0c8b1a"
 *     responses:
 *       200:
 *         description: 북마크 등록/취소 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 bookmark:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 북마크 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1b"
 *                     userId:
 *                       type: string
 *                       description: 북마크한 사용자 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1c"
 *                     storeId:
 *                       type: string
 *                       description: 북마크된 스토어 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *       400:
 *         description: storeId 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "북마크 등록을 위한 storeId 값이 누락되었습니다."
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
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "북마크 생성 중 오류가 발생했습니다."
 */

/**
 * @swagger
 * /bookmark:
 *   get:
 *     tags: [Bookmark]
 *     summary: 북마크 조회
 *     description: 로그인 후 사용자가 북마크한 스토어 목록을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 북마크 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 bookmarks:
 *                   type: array
 *                   description: 북마크된 스토어 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: 스토어 이름
 *                         example: "Sample Store"
 *                       category:
 *                         type: string
 *                         description: 스토어 카테고리
 *                         example: "카페"
 *                       isOpen:
 *                         type: boolean
 *                         description: 스토어 오픈 여부
 *                         example: true
 *                       comments:
 *                         type: number
 *                         description: 스토어에 달린 댓글 수
 *                         example: 5
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
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 */
