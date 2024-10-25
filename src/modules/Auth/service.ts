import bcrypt from 'bcrypt';
import { User } from '@/models';
import { AppError } from '@/utils';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';

// 회원가입 로직
export const localRegisterUser = async (email: string, password: string) => {
	// 1. 중복가입 조회
	const isUser = await User.findOne({ email });
	if (isUser) throw new AppError('이미 가입된 이메일 입니다.', 409);

	// 2. 사용자 생성
	const newUser = new User({
		email,
		password,
	});
	await newUser.save();

	// 3. 토큰 생성
	const accessToken = generateAccessToken({ id: newUser.id });
	const refreshToken = generateRefreshToken({ id: newUser.id });

	return { accessToken, refreshToken, user: newUser.id };
};

// 로그인 로직
export const localLoginUser = async (email: string, password: string) => {
	// 1. 사용자 조회
	const user = await User.findOne({ email }).select('+password');
	if (!user) throw new AppError('잘못된 이메일 또는 패스워드 입니다.', 401);

	// 2. 비밀번호 검증
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new AppError('잘못된 이메일 또는 패스워드 입니다.', 401);

	// 3. 토큰 생성
	const accessToken = generateAccessToken({ id: user.id });
	const refreshToken = generateRefreshToken({ id: user.id });

	return { accessToken, refreshToken, user: user.id };
};
