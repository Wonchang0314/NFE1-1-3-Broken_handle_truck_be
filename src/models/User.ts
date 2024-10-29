import { AppError } from '@/utils';
import bcrypt from 'bcrypt';
import moment from 'moment';
import { Document, model, Schema, Types } from 'mongoose';

export interface IUser extends Document {
	email: string;
	nickname: string;
	password: string;
	createdAt: string;
	oAuth?: string;
	oAuthIdKey?: string;
	role: 'user' | 'owner';
}

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		sparse: true,
		required: function (this: IUser) {
			return !this.oAuth;
		},
	},
	password: {
		type: String,
		select: false,
		required: function (this: IUser) {
			return !this.oAuth;
		},
	},
	createdAt: {
		type: String,
		default: () => moment().format('YYYY-MM-DD HH:mm'),
	},
	oAuth: {
		type: String,
		enum: ['Kakao', 'GitHub'],
		default: null,
	},
	oAuthIdKey: {
		type: String,
		unique: true,
		sparse: true,
	},
	nickname: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['user', 'owner'],
		default: 'user',
	},
});

userSchema.pre('save', async function (next) {
	const user = this as IUser;

	if (!user.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (e) {
		if (e instanceof AppError) {
			next(e);
		} else {
			next(new AppError('비밀번호 해싱 중 오류가 발생했습니다', 500));
		}
	}
});

const User = model<IUser>('User', userSchema);

export default User;
