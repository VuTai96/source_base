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
    const getRequest = 'GET / HTTP/1.1\r\n' + 'Host: 127.0.0.1:3000\r\n' + 'Connection: keep-alive\r\n' + '\r\n';
    socket.write(getRequest);

    // send POST after GET 1000ms later
    setTimeout(() => {
        const postBody = JSON.stringify({ msg: 'Hello from client!' });
        const postRequest =
            'POST / HTTP/1.1\r\n' +
            'Host: 127.0.0.1:3000\r\n' +
            'Content-Type: application/json\r\n' +
            `Content-Length: ${Buffer.byteLength(postBody)}\r\n` +
            'Connection: close\r\n' +
            '\r\n' +
            postBody;
        socket.write(postRequest);
    }, 1000);
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
