/**
 * 커스텀 에러
 * @param {string} message - 에러에 대한 설명 메시지
 * @param {number} statusCode - HTTP 상태 코드(ex: 400, 401, 500)
 */
export default class AppError extends Error {
	statusCode: number;
	isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}
