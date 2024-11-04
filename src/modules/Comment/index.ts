import { Router } from 'express';
import {
	getCommentController,
	postCommentController,
	deleteCommentController,
	getMyCommentsController,
} from './controller';
import { authHandler } from '@/middlewares';

const commentRouter = Router();

commentRouter
	.route('/')
	.get(getCommentController)
	.all(authHandler)
	.post(postCommentController);
commentRouter
	.route('/myComments')
	.all(authHandler)
	.get(getMyCommentsController);
commentRouter
	.route('/:commentId([0-9a-f]{24})')
	.all(authHandler)
	.delete(deleteCommentController);

export default commentRouter;

/**
 * @swagger
 * /comment:
 *   get:
 *     tags: [Comment]
 *     summary: 댓글 조회
 *     description: 특정 스토어에 대한 댓글을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 스토어의 ID
 *     responses:
 *       200:
 *         description: 댓글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 comments:
 *                   type: array
 *                   description: 스토어에 대한 댓글 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 댓글 ID
 *                         example: "64b9c63f5f5d2a001d0c8b1a"
 *                       storeId:
 *                         type: string
 *                         description: 댓글이 달린 스토어 ID
 *                         example: "64b9c63f5f5d2a001d0c8b1a"
 *                       content:
 *                         type: string
 *                         description: 댓글 내용
 *                         example: "Great store!"
 *                       createdAt:
 *                         type: string
 *                         description: 댓글 작성 일자
 *                         example: "2023-09-01 12:00"
 *                       authorId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: 댓글 작성자 ID
 *                             example: "64b9c63f5f5d2a001d0c8b1c"
 *                           nickname:
 *                             type: string
 *                             description: 댓글 작성자 닉네임
 *                             example: "john_doe"
 *       400:
 *         description: storeId 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "댓글 조회를 위한 storeId 값이 누락되었습니다."
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

/**
 * @swagger
 * /comment:
 *   post:
 *     tags: [Comment]
 *     summary: 댓글 등록
 *     description: 로그인 후 특정 스토어에 댓글을 등록합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 댓글 내용 (필수)
 *                 example: "This is a great store!"
 *               storeId:
 *                 type: string
 *                 description: 댓글을 달 스토어 ID (필수)
 *                 example: "64b9c63f5f5d2a001d0c8b1a"
 *     responses:
 *       201:
 *         description: 댓글 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 comment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 댓글 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1b"
 *                     storeId:
 *                       type: string
 *                       description: 댓글이 달린 스토어 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     content:
 *                       type: string
 *                       description: 댓글 내용
 *                       example: "This is a great store!"
 *                     createdAt:
 *                       type: string
 *                       description: 댓글 생성 일자
 *                       example: "2023-09-01 12:00"
 *                     authorId:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: 댓글 작성자 ID
 *                           example: "64b9c63f5f5d2a001d0c8b1c"
 *                         nickname:
 *                           type: string
 *                           description: 댓글 작성자 닉네임
 *                           example: "john_doe"
 *       400:
 *         description: 요청 본문 값 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "댓글 생성을 위해 필요한 값이 누락되었습니다."
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

/**
 * @swagger
 * /comment/{commentId}:
 *   delete:
 *     tags: [Comment]
 *     summary: 댓글 삭제
 *     description: 로그인 후 특정 댓글을 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *       400:
 *         description: commentId 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "댓글 삭제를 위한 commentId 값이 누락되었습니다."
 *       404:
 *         description: 댓글을 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "댓글을 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "댓글 삭제에 실패했습니다."
 */

/**
 * @swagger
 * /myComments:
 *   get:
 *     tags: [Comment]
 *     summary: "내 댓글 목록 조회"
 *     description: "사용자가 작성한 댓글 목록을 조회합니다."
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "성공적으로 댓글 목록을 가져옴"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: "댓글 ID"
 *                         example: "60a4b5f69f1b2c0015d0e4c7"
 *                       content:
 *                         type: string
 *                         description: "댓글 내용"
 *                         example: "이 가게 정말 좋아요!"
 *                       storeId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: "가게 ID"
 *                             example: "60a4b5f69f1b2c0015d0e4d8"
 *                           name:
 *                             type: string
 *                             description: "가게 이름"
 *                             example: "Store 1"
 *                           category:
 *                             type: string
 *                             description: "가게 카테고리"
 *                             example: "카페"
 *                       authorId:
 *                         type: string
 *                         description: "작성자 ID"
 *                         example: "60a4b5f69f1b2c0015d0e4f9"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: "댓글 작성 날짜"
 *                         example: "2023-10-24T12:34:56"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: "댓글 수정 날짜"
 *                         example: "2023-10-24T12:34:56"
 *       401:
 *         description: "인증 실패 - 잘못된 접근"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "사용자 인증 정보가 없습니다. 잘못된 접근입니다."
 *       500:
 *         description: "서버 오류"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 */
