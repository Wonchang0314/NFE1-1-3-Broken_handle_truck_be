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
				url: 'https://port-0-nfe1-1-3-broken-handle-truck-be-m2sh5v6z733a6e47.sel4.cloudtype.app/api',
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
