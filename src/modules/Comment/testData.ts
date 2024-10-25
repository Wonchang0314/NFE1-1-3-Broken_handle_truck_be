import moment from 'moment';
import mongoose from 'mongoose';

const dummyComments = [
	{
		storeId: new mongoose.Types.ObjectId(),
		content: '첫 번째 댓글입니다.',
		password: 'pass123',
		createdAt: moment().format('YYYY-MM-DD HH:mm'),
	},
	{
		storeId: new mongoose.Types.ObjectId(),
		content: '두 번째 댓글입니다.',
		password: 'pass456',
		createdAt: moment().format('YYYY-MM-DD HH:mm'),
	},
	{
		storeId: new mongoose.Types.ObjectId(),
		content: '세 번째 댓글입니다.',
		password: 'pass789',
		createdAt: moment().format('YYYY-MM-DD HH:mm'),
	},
	{
		storeId: new mongoose.Types.ObjectId(),
		content: '네 번째 댓글입니다.',
		password: 'pass000',
		createdAt: moment().format('YYYY-MM-DD HH:mm'),
	},
	{
		storeId: new mongoose.Types.ObjectId(),
		content: '다섯 번째 댓글입니다.',
		password: 'pass999',
		createdAt: moment().format('YYYY-MM-DD HH:mm'),
	},
];

export default dummyComments;
