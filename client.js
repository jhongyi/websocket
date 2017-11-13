const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:9090');

// client 端送出訊息給 server
// Emitted when the connection is established.
ws.on('open', function open() {
    console.log('client connected');
    ws.send('hello server!!!!!!');
});

const interval = setInterval(() => {
    start_push_msg();
}, 1000);

start_push_msg = () => {
    ws.send('一直送一直送給後端');
}

setTimeout(() => {
    console.log('stop client push msg.');
    clearInterval(interval);
}, 5000);

// client 端收到 server 送出的請求
ws.on('message', function incoming(data) {
    console.log('收到來自 server 端推播的訊息: ', data);
});