import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import config from '@/config';
import mongoose from 'mongoose';
import apiRouter from '@/modules';
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

// DB 연결
mongoose
	.connect(MONGO_DB_URI || 'mongodb://localhost:27017/Broken_handle')
	.then(() => console.log('DB connected✅'))
	.catch((e) => console.error(e));

// Routes 연결
App.use('/api', apiRouter);

export default App;