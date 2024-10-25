import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import config from '@/config';
import mongoose from 'mongoose';
import apiRouter from '@/modules';
import { errorHandler, notFoundHandler } from '@/middlewares';
import { Store } from './models';
import dummyStores from './modules/Store/testData';

const { FRONT_BASE_URL, MONGO_DB_URI } = config;

const App = express();

// 미들웨어 설정
App.use(helmet());
App.use(hpp());

// Cors 설정
App.use(
	cors({
		origin: FRONT_BASE_URL || 'http://localhost:5173',
		credentials: true,
	}),
);

App.use(express.json());
App.use(cookieParser());

const insertDummyData = async () => {
	try {
		// 기존 데이터가 있을 경우 삭제
		await Store.deleteMany({});
		await Store.insertMany(dummyStores);

		console.log('데이터 삽입 완료!');
	} catch (error) {
		console.error('데이터를 삽입하는 중 오류 발생:', error);
	}
};

// DB 연결
mongoose
	.connect(MONGO_DB_URI || 'mongodb://localhost:27017/Broken_handle')
	.then(() => {
		console.log('DB connected✅');
		insertDummyData();
	})
	.catch((e) => console.error(e));

// Routes 연결
App.use('/api', apiRouter);

// 404 에러 처리 미들웨어
App.use(notFoundHandler);

// 에러 처리 미들웨어
App.use(errorHandler);

export default App;
