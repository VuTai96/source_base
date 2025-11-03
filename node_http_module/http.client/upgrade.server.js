const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.end('[SERVER] This is a normal HTTP response.\n');
});

server.on('upgrade', (req, socket, head) => {
    console.log('[SERVER] Received upgrade request');
    console.log('[SERVER] Headers:', req.headers);

    // Acknowledge the upgrade request
    socket.write(
        'HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
            'Upgrade: websocket\r\n' +
            'Connection: Upgrade\r\n' +
            '\r\n',
    );

    // Echo back any data received on the upgraded connection
    socket.on('data', (chunk) => {
        console.log(`[SERVER] Received data: ${chunk.toString()}`);
        socket.write('[SERVER] Echo: ' + chunk);
    });

    socket.on('end', () => {
        console.log('[SERVER] Client disconnected');
    });

    socket.on('error', (err) => {
        console.error(`[SERVER] Socket error: ${err.message}`);
    });
});

server.listen(3000, () => {
    console.log('[SERVER] Listening on http://localhost:3000');
});
