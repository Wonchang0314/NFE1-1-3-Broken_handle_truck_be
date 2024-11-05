import WebSocket from 'ws';
import http from 'http';
import config from '@/config';
import App from '@/app';
import wss from '@/modules/webSocketServer';

const { RUNNING_PORT } = config;

const server = http.createServer(App);

// WebSocket 연결을 위한 업그레이드 이벤트 설정
server.on('upgrade', (request, socket, head) => {
	wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
		wss.emit('connection', ws, request);
	});
});

server.listen(RUNNING_PORT || 8080, () => {
	console.log(`Server started on Port ${RUNNING_PORT || 8080} ✅`);
});
