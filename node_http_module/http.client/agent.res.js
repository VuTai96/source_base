const http = require('http');

server = http.createServer((req, res) => {
    console.log(`Incoming request from ${req.socket.remotePort}`);
    res.writeHead(200, {
        'content-type': 'text/plain',
        connection: 'keep-alive',
    });
    res.end('Hello, World!\n');
});

server.maxConnections = 2; // giới hạn tối đa 2 kết nối đồng thời
server.keepAliveTimeout = 5000; // socket rảnh > 5s thì đóng

// theo dõi các socket đang dữ
socketSet = new Set();
server.on('connection', (socket) => {
    console.log(`socket: ${socket}
            -- remoteAddress: ${socket.remoteAddress}
            -- remotePort: ${socket.remotePort}
            -- bytesRead: ${socket.bytesRead}
            -- bytesWritten: ${socket.bytesWritten}

        `);
    socketSet.add(socket);
    console.log(`New connection from ${socket.remotePort},
        total connections: ${socketSet.size}`);

    socket.setTimeout(10000);
    socket.on('timeout', () => {
        console.log(`Socket from ${socket.remotePort} timed out`);
        socket.destroy();
    });
    socket.on('close', () => {
        socketSet.delete(socket);
        console.log(`Connection from ${socket.remotePort} closed,
            total connections: ${socketSet.size}`);
    });
});

server.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});
