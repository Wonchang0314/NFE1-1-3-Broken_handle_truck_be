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
