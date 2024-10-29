import bcrypt from 'bcrypt';
import { Comment, Store, User } from '@/models';
import { AppError } from '@/utils';
import {
	generateAccessToken,
	generateRefreshToken,
	IPayload,
} from '@/utils/jwt';
import mongoose from 'mongoose';
import { getKakaoToken, getKakaoUser, IUserData } from '@/utils/kakao';

// 회원가입 로직
export const localRegisterUser = async (
	email: string,
	password: string,
	nickname: string,
) => {
	// 1. 중복가입 조회
	const isUser = await User.findOne({ email });
	if (isUser) throw new AppError('이미 가입된 이메일 입니다.', 409);

	// 2. 사용자 생성
	const newUser = new User({
		email,
		password,
		nickname,
	});
	const user = await newUser.save();

	const payload: IPayload = {
		_id: user.id,
		nickname: user.nickname,
	};

	// 3. 토큰 생성
	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	return {
		accessToken,
		refreshToken,
		user: { _id: user.id, nickname: user.nickname },
	};
};

// 로그인 로직
export const localLoginUser = async (email: string, password: string) => {
	// 1. 사용자 조회
	const user = await User.findOne({ email }).select('+password');
	if (!user) throw new AppError('잘못된 이메일 또는 패스워드 입니다.', 401);

	// 2. 비밀번호 검증
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new AppError('잘못된 이메일 또는 패스워드 입니다.', 401);

	const payload: IPayload = {
		_id: user.id,
		nickname: user.nickname,
	};

	// 3. 토큰 생성
	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	return {
		accessToken,
		refreshToken,
		user: { _id: user.id, nickname: user.nickname },
	};
};

// 회원탈퇴 로직
export const deleteUser = async (userId: string) => {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// 1. 사용자 조회
		const user = await User.findById(userId).session(session);
		if (!user) throw new AppError('사용자 정보를 찾을 수 없습니다.', 404);

		// 2. 사용자의 Store 확인 및 관련 Comment 삭제
		const store = await Store.findOne({ ownerId: userId }).session(session);
		if (store) {
			await Comment.deleteMany({ storeId: store.id }).session(session);
			await Store.findByIdAndDelete(store.id).session(session);
		}

		// 3. 사용자 삭제
		await User.findByIdAndDelete(user.id).session(session);

		await session.commitTransaction();
	} catch (e) {
		await session.abortTransaction();
		session.endSession();

		if (e instanceof AppError) throw e;
		else
			throw new AppError(
				'회원 탈퇴 중 오류가 발생했습니다. 모든 작업이 원복됩니다.',
				500,
			);
	} finally {
		session.endSession();
	}
};

export const kakaoLogin = async (code: string) => {
	const token = await getKakaoToken(code);
	const userData: IUserData = await getKakaoUser(token);

	let user = await User.findOne({ oAuthIdKey: userData.id, oAuth: 'Kakao' });

	if (!user) {
		const newUser = new User({
			oAuth: 'Kakao',
			oAuthIdKey: userData.id,
		});
		user = await newUser.save();
	}

	const payload: IPayload = {
		_id: user.id,
		nickname: user.nickname,
	};

	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);

	return { accessToken, refreshToken };
};
