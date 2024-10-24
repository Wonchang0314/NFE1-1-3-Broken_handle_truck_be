import { Request, Response } from 'express';
import { getStores } from './service';

export const getStoresController = async (req: Request, res: Response) => {
	try {
		const { latitude, longitude } = req.body;
		if (latitude === undefined || longitude === undefined) {
			res.status(400).json({ message: '위도와 경도를 제공해야 합니다.' });
		}
		const stores = await getStores(latitude, longitude);
		res.status(200).json(stores);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
	return;
};
