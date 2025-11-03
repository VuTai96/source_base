const http = require('http');

const options = {
    host: 'localhost',
    port: 3000,
    headers: {
        Connection: 'Upgrade',
        Upgrade: 'websocket',
    },
};

const req = http.request(options);
req.end();

req.on('upgrade', (res, socket, head) => {
    console.log('[CLIENT] Got upgraded to raw TCP');
    console.log('[CLIENT] Headers:', res.headers);

    // Send data over the upgraded connection
    socket.write('Hello over upgraded connection!\n');
    socket.write('Another message from client.\n');

    socket.on('data', (chunk) => {
        console.log(`[CLIENT] Received data: ${chunk.toString()}`);
    });

    socket.on('end', () => {
        console.log('[CLIENT] Connection closed');
    });
    socket.on('error', (err) => {
        console.error(`[CLIENT] Socket error: ${err.message}`);
    });

    setTimeout(() => {
        socket.end();
    }, 5000);
});
