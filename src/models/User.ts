import moment from 'moment';
import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	createdAt: string;
	oAuth?: string;
	oAuthIdKey?: string;
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
});

const User = model<IUser>('User', userSchema);

export default User;
