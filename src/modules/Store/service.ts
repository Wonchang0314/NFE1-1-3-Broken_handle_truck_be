import Store from '../../models/Store';

export const getStores = async (
	latitude: number = 0,
	longitude: number = 0,
) => {
	try {
		const radiusInKm = 1;
		const earthRadiusInKm = 6378.1;
		const stores = await Store.find({
			coordinates: {
				$geoWithin: {
					$centerSphere: [[longitude, latitude], radiusInKm / earthRadiusInKm],
				},
			},
		});
		return stores;
	} catch (error) {
		console.log(error);
		throw new Error('데이터를 불러오는데 실패했습니다');
	}
};
