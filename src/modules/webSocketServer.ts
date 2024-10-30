import WebSocket from 'ws';

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
	console.log('웹소캣 시작');

	ws.on('message', (message) => {
		console.log('받은 메시지:', message);
	});

	ws.on('close', () => {
		console.log('웹소캣 끝');
	});
});

export default wss;
