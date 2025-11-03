const http = require('http');

const proxyOptions = {
    host: '127.0.0.1',
    port: 1337,
    method: 'CONNECT',
    path: '127.0.0.1:3000', // target server
};

// send CONNECT request to proxy server
const req = http.request(proxyOptions);
req.end();

req.on('connect', (res, socket, head) => {
    console.log('[CLIENT] Turnnel established through proxy');

    // make HTTP request over the established tunnel
    socket.write('GET / HTTP/1.1\r\n' + 'Host: 127.0.0.1:3000\r\n' + 'Connection: close\r\n' + '\r\n');

    // receive response from target server
    socket.on('data', (chunk) => {
        console.log(`[CLIENT] Received data:\n${chunk.toString()}`);
    });
    socket.on('end', () => {
        console.log('[CLIENT] Connection closed by server');
    });
    socket.on('error', (err) => {
        console.error(`[CLIENT] Socket error: ${err.message}`);
    });
});
