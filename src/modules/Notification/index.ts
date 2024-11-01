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

notificationRouter.post('/read', postAsReadController);
notificationRouter.post('/readAll', postAsReadAllController);

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
