import { Router } from 'express';
import {
	postNotificationController,
	getNotificationController,
	postAsReadController,
	postAsReadAllController,
} from './controller';
import authHandler from '@/middlewares/authHandler';

const notificationRouter = Router();

notificationRouter
	.route('/')
	.all(authHandler)
	.get(getNotificationController)
	.post(postNotificationController);

notificationRouter.post('/read', authHandler, postAsReadController);
notificationRouter.post('/readAll', authHandler, postAsReadAllController);

export default notificationRouter;

/**
 * @swagger
 * /notification:
 *   get:
 *     tags: [Notification]
 *     summary: 알림 조회
 *     description: 로그인한 사용자가 받은 알림을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 알림 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 notification:
 *                   type: array
 *                   description: 사용자가 받은 알림 목록
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 알림 ID
 *                         example: "64b9c63f5f5d2a001d0c8b1b"
 *                       recipients:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: 알림을 받은 사용자 ID 목록
 *                         example: ["64b9c63f5f5d2a001d0c8b1c"]
 *                       sender:
 *                         type: string
 *                         description: 알림을 보낸 스토어 ID
 *                         example: "64b9c63f5f5d2a001d0c8b1a"
 *                       type:
 *                         type: string
 *                         description: 알림 유형 (영업 시작/종료)
 *                         enum: [ "open", "closed" ]
 *                         example: "open"
 *                       content:
 *                         type: string
 *                         description: 알림 내용
 *                         example: "카페가 영업을 시작했습니다"
 *                       createdAt:
 *                         type: string
 *                         description: 알림 생성일자
 *                         example: "2023-09-01 12:00"
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
 * /notification:
 *   post:
 *     tags: [Notification]
 *     summary: 알림 등록 (스토어 on/off 토글)
 *     description: 로그인한 스토어 소유자가 스토어의 on/off 상태를 토글할 때, 북마크한 사용자에게 알림을 전송합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: 알림 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 Notification:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 알림 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1b"
 *                     recipients:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: 알림을 받은 사용자 ID 목록
 *                       example: ["64b9c63f5f5d2a001d0c8b1c"]
 *                     sender:
 *                       type: string
 *                       description: 알림을 보낸 스토어 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     type:
 *                       type: string
 *                       description: 알림 유형 (영업 시작/종료)
 *                       enum: [ "open", "closed" ]
 *                       example: "open"
 *                     content:
 *                       type: string
 *                       description: 알림 내용
 *                       example: "카페가 영업을 시작했습니다"
 *                     createdAt:
 *                       type: string
 *                       description: 알림 생성일자
 *                       example: "2023-09-01 12:00"
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
 *         description: 스토어 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "존재하지 않는 가게입니다."
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
 * /notification/read:
 *   post:
 *     summary: 특정 알림을 읽음 상태로 업데이트
 *     description: 알림 ID를 받아 해당 알림을 읽음 처리합니다.
 *     tags: [Notification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationId:
 *                 type: string
 *                 description: 읽음 처리할 알림의 ID
 *                 example: "635f93d19f1fbc0012e06b8f"
 *     responses:
 *       201:
 *         description: 알림이 읽음 상태로 업데이트됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *       400:
 *         description: 잘못된 요청 (알림 ID가 누락됨)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "알림 ID가 누락되었습니다"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 *     security:
 *       - bearerAuth: []
 */

/**
 * @swagger
 * /notification/readAll:
 *   post:
 *     summary: 모든 알림을 읽음 상태로 업데이트
 *     description: 현재 사용자의 모든 읽지 않은 알림을 읽음 상태로 변경합니다.
 *     tags: [Notification]
 *     responses:
 *       201:
 *         description: 모든 알림이 읽음 상태로 업데이트됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *       401:
 *         description: 사용자 인증 정보가 없는 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "사용자 인증 정보가 없습니다. 잘못된 접근입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "알 수 없는 서버 오류가 발생했습니다."
 *     security:
 *       - bearerAuth: []
 */
