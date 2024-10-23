import config from '@/config';
import App from '@/app';

const { RUNNING_PORT } = config;

App.listen(RUNNING_PORT || 8080, () =>
	console.log(`Server started on Port ${RUNNING_PORT}✅`),
);
