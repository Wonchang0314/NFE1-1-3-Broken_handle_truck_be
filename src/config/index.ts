import dotenv from 'dotenv';
dotenv.config();

export default {
	MONGO_DB_URI: process.env.MONGO_DB_URI,
	JWT_SECRET: process.env.JWT_SECRECT,
	RUNNING_PORT: process.env.RUNNING_PORT,
	FRONT_BASE_URL: process.env.FRONT_BASE_URL,
};
