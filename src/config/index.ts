import dotenv from 'dotenv';
dotenv.config();

export default {
	MONGO_DB_URI: process.env.MONGO_DB_URI,
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	RUNNING_PORT: process.env.RUNNING_PORT,
	FRONT_BASE_URL: process.env.FRONT_BASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	KAKAO_REST_API_KEY: process.env.KAKAO_REST_API_KEY,
	KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
};
