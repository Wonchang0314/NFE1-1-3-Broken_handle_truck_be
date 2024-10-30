import WebSocket from 'ws';
import url from 'url';

export interface WebSocketWithUserId extends WebSocket {
	userId: string;
}
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws: WebSocketWithUserId, req) => {
	const query = new URLSearchParams(url.parse(req.url || '').query || '');
	const userId = query.get('userId');

	if (userId) {
		ws.userId = userId;
		console.log(`${userId}와 웹소켓 시작`);
	} else {
		console.log('userId가 없습니다.');
		ws.close(1008, 'User ID가 필요합니다');
	}

	ws.on('message', (message) => {
		console.log('받은 메시지:', message);
	});

	ws.on('close', () => {
		console.log('웹소캣 끝');
	});
});

export default wss;
