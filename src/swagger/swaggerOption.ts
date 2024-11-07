import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Documentation',
			version: '1.0.0',
			description: 'API documentation for your project',
		},
		servers: [
			{
				url: 'https://api.broken-handle-truck.store',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT', // JWT 토큰 형식 지정
				},
			},
		},
	},
	apis: ['./src/modules/**/*.ts'], // 라우팅 경로 설정
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
