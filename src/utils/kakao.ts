import axios from 'axios';
import config from '@/config';
const { KAKAO_REDIRECT_URI, KAKAO_REST_API_KEY } = config;

export interface IUserData {
	id: number;
	kakao_account: {
		profile: {
			nickname: string;
			thumbnail_image_url: string;
		};
	};
}

export const getKakaoToken = async (code: string) => {
	const res = await axios.post('https://kauth.kakao.com/oauth/token', null, {
		params: {
			grant_type: 'authorization_code',
			client_id: KAKAO_REST_API_KEY,
			redirect_uri: KAKAO_REDIRECT_URI,
			code: code,
		},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});

	return res.data.access_token;
};

export const getKakaoUser = async (accessToken: string) => {
	const res = await axios.get('https://kapi.kakao.com/v2/user/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return res.data;
};
