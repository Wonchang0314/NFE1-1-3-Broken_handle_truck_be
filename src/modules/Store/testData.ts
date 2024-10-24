import mongoose from 'mongoose';

// 경도, 위도 순서로 되어있어야함
const dummyStores = [
	{
		ownerId: new mongoose.Types.ObjectId(),
		coordinates: [-122.4194, 37.7749],
		isOpen: true,
		category: '잉어빵',
		paymentMethod: ['카드', '현금'],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		ownerId: new mongoose.Types.ObjectId(),
		coordinates: [-74.006, 40.7128],
		isOpen: false,
		category: '계란빵',
		paymentMethod: ['카드'],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
	{
		ownerId: new mongoose.Types.ObjectId(),
		coordinates: [-118.2437, 34.0522],
		isOpen: true,
		category: '호떡',
		paymentMethod: ['현금', '카드', '계좌이체'],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	},
];

export default dummyStores;
