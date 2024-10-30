import { Router } from 'express';
import {
	deleteStoreController,
	getStoreByIdController,
	getStoreController,
	getStoresController,
	postStoreController,
} from './controller';
import { authHandler } from '@/middlewares';

const storeRouter = Router();

storeRouter.route('/all').get(getStoresController);
storeRouter
	.route('/')
	.all(authHandler)
	.post(postStoreController)
	.get(getStoreController)
	.delete(deleteStoreController);
storeRouter.route('/:storeId([0-9a-f]{24})').get(getStoreByIdController);

export default storeRouter;

/**
 * @swagger
 * /store:
 *   get:
 *     tags: [Store]
 *     summary: 사용자 스토어 정보 조회
 *     description: 로그인 후 접근 가능한 사용자 스토어 정보와 해당 스토어에 대한 댓글을 조회합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 스토어 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 store:
 *                   oneOf:
 *                     - type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: 스토어 ID
 *                           example: "64b9c63f5f5d2a001d0c8b1a"
 *                         name:
 *                           type: string
 *                           description: 스토어 이름
 *                           example: "Sample Store"
 *                         ownerId:
 *                           type: string
 *                           description: 스토어 소유자 ID
 *                           example: "64b9c63f5f5d2a001d0c8b1a"
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           description: 스토어 좌표 (경도, 위도)
 *                           example: [-122.4194, 37.7749]
 *                         isOpen:
 *                           type: boolean
 *                           description: 스토어 오픈 여부
 *                           example: true
 *                         category:
 *                           type: string
 *                           description: 스토어 카테고리
 *                           example: "카페"
 *                         paymentMethod:
 *                           type: array
 *                           items:
 *                             type: string
 *                           description: 결제 수단
 *                           example: ["현금", "카드"]
 *                         createdAt:
 *                           type: string
 *                           description: 생성 일자
 *                           example: "2023-09-01 12:00"
 *                         updatedAt:
 *                           type: string
 *                           description: 수정 일자
 *                           example: "2023-09-02 14:30"
 *                     - type: "null"
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
 *                       authorId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: 댓글 작성자 ID
 *                             example: "64b9c63f5f5d2a001d0c8b1a"
 *                           nickname:
 *                             type: string
 *                             description: 댓글 작성자 닉네임
 *                             example: "john_doe"
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
 * /store:
 *   post:
 *     tags: [Store]
 *     summary: 스토어 등록 및 수정
 *     description: 로그인 후 스토어를 등록하거나 기존 스토어를 수정합니다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: 스토어 이름 (필수)
 *                 example: "Sample Store"
 *               coordinates:
 *                 type: array
 *                 description: 스토어 좌표 (경도, 위도)
 *                 items:
 *                   type: number
 *                 example: [-122.4194, 37.7749]
 *               category:
 *                 type: string
 *                 description: 스토어 카테고리 (필수)
 *                 example: "카페"
 *               paymentMethod:
 *                 type: array
 *                 description: 결제 수단 (필수)
 *                 items:
 *                   type: string
 *                 example: ["현금", "카드"]
 *     responses:
 *       201:
 *         description: 스토어 등록/수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 store:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 스토어 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     name:
 *                       type: string
 *                       description: 스토어 이름
 *                       example: "Sample Store"
 *                     ownerId:
 *                       type: string
 *                       description: 스토어 소유자 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: 스토어 좌표 (경도, 위도)
 *                       example: [-122.4194, 37.7749]
 *                     isOpen:
 *                       type: boolean
 *                       description: 스토어 오픈 여부
 *                       example: true
 *                     category:
 *                       type: string
 *                       description: 스토어 카테고리
 *                       example: "카페"
 *                     paymentMethod:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: 결제 수단
 *                       example: ["현금", "카드"]
 *                     createdAt:
 *                       type: string
 *                       description: 생성 일자
 *                       example: "2023-09-01 12:00"
 *                     updatedAt:
 *                       type: string
 *                       description: 수정 일자
 *                       example: "2023-09-02 14:30"
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
 *                       authorId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: 댓글 작성자 ID
 *                             example: "64b9c63f5f5d2a001d0c8b1a"
 *                           nickname:
 *                             type: string
 *                             description: 댓글 작성자 닉네임
 *                             example: "john_doe"
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
 *       400:
 *         description: 요청 본문 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "가게 등록을 위한 정보가 누락된 요청입니다."
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
 *         description: 스토어 등록 실패 - 사용자 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "스토어 등록시 사용자 정보를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "스토어 등록에 실패했습니다."
 */

/**
 * @swagger
 * /store/all:
 *   get:
 *     tags: [Store]
 *     summary: 사용자 주변 모든 스토어 조회
 *     description: 위도와 경도를 기준으로 사용자 주변의 스토어 정보를 조회합니다.
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자의 현재 위도 (필수)
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: string
 *         description: 사용자의 현재 경도 (필수)
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: 스토어 카테고리 (옵션)
 *       - in: query
 *         name: storeName
 *         required: false
 *         schema:
 *           type: string
 *         description: 스토어 이름 (옵션)
 *     responses:
 *       200:
 *         description: 스토어 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 stores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 스토어 ID
 *                         example: "64b9c63f5f5d2a001d0c8b1a"
 *                       name:
 *                         type: string
 *                         description: 스토어 이름
 *                         example: "Sample Store"
 *                       ownerId:
 *                         type: string
 *                         description: 스토어 소유자 ID
 *                         example: "64b9c63f5f5d2a001d0c8b1a"
 *                       coordinates:
 *                         type: array
 *                         items:
 *                           type: number
 *                         description: 경도와 위도 좌표
 *                         example: [-122.4194, 37.7749]
 *                       isOpen:
 *                         type: boolean
 *                         description: 스토어 오픈 여부
 *                         example: true
 *                       category:
 *                         type: string
 *                         description: 스토어 카테고리
 *                         example: "풀빵"
 *                       paymentMethod:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: 결제 수단
 *                         example: ["현금", "카드"]
 *                       createdAt:
 *                         type: string
 *                         description: 생성 일자
 *                         example: "2023-09-01 12:00"
 *                       updatedAt:
 *                         type: string
 *                         description: 수정 일자
 *                         example: "2023-09-01 12:00"
 *       400:
 *         description: 위도 또는 경도 정보 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "위도, 경도 정보가 누락된 요청입니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Store 데이터를 불러오는데 실패했습니다"
 */

/**
 * @swagger
 * /store/{storeId}:
 *   get:
 *     tags: [Store]
 *     summary: 특정 스토어 정보 조회
 *     description: 특정 스토어의 상세 정보와 해당 스토어에 대한 댓글을 조회합니다.
 *     responses:
 *       200:
 *         description: 스토어 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "ok"
 *                 store:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 스토어 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     name:
 *                       type: string
 *                       description: 스토어 이름
 *                       example: "Sample Store"
 *                     ownerId:
 *                       type: string
 *                       description: 스토어 소유자 ID
 *                       example: "64b9c63f5f5d2a001d0c8b1a"
 *                     coordinates:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: 스토어 좌표 (경도, 위도)
 *                       example: [-122.4194, 37.7749]
 *                     isOpen:
 *                       type: boolean
 *                       description: 스토어 오픈 여부
 *                       example: true
 *                     category:
 *                       type: string
 *                       description: 스토어 카테고리
 *                       example: "카페"
 *                     paymentMethod:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: 결제 수단
 *                       example: ["현금", "카드"]
 *                     createdAt:
 *                       type: string
 *                       description: 생성 일자
 *                       example: "2023-09-01 12:00"
 *                     updatedAt:
 *                       type: string
 *                       description: 수정 일자
 *                       example: "2023-09-02 14:30"
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
 *                       authorId:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: 댓글 작성자 ID
 *                             example: "64b9c63f5f5d2a001d0c8b1a"
 *                           nickname:
 *                             type: string
 *                             description: 댓글 작성자 닉네임
 *                             example: "john_doe"
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
 *       400:
 *         description: storeId 파라미터 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "storeId 정보가 누락되었습니다."
 *       404:
 *         description: 스토어가 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Store가 존재하지 않습니다."
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
 * /store:
 *   delete:
 *     tags: [Store]
 *     summary: 등록한 스토어 삭제
 *     description: 로그인 후 접근 가능한 사용자가 자신의 등록한 스토어를 삭제합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 스토어 삭제 성공
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
 *         description: 스토어를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Store가 존재하지 않습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Store 삭제에 실패했습니다. 모든 작업이 원복됩니다."
 */
