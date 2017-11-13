// WebSocket start on port 9090
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 9090 });

const express = require('express');
const app = express();

// Start REST server on port 8080
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Websocket event broadcaster REST API listening on http://%s:%s", host, port)
});

// 進 API 後將訊息送出給 client
app.post('/socket', function (req, res) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send("hello client!!!!!!");
        }
    });
    res.sendStatus(200);
});

// server 端收到 client 端送出的請求
wss.on('connection', function connection(ws) {
    const interval = setInterval(() => {
        start_push_msg();
    }, 1000);
    
    start_push_msg = () => {
        ws.send('一直送一直送給前端');
    }
    
    setTimeout(() => {
        console.log('stop server push msg.');
        clearInterval(interval);
    }, 5000);

    ws.on('message', function incoming(message) {
        console.log('收到 client 端發出的訊息: %s', message);
    });
});