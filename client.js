const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:9090');

// client 端送出訊息給 server
// Emitted when the connection is established.
ws.on('open', function open() {
    ws.send('hello server!!!!!!');
});

// client 端收到 server 送出的請求
ws.on('message', function incoming(data) {
    console.log('收到來自 server 端推播的訊息: ', data);
});