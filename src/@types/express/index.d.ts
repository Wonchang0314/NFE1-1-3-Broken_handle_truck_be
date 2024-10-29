import { IPayload } from '@/utils/jwt';
import { Request } from 'express';

declare module 'express' {
	export interface Request {
		user?: IPayload;
	}
}
