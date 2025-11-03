const http = require('http');
const net = require('net');
const { URL } = require('url');

// Proxy server to handle CONNECT method from clients
const proxy = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a plain HTTP from proxy (not CONNECT).');
});

// Handle CONNECT requests (for tunneling)
proxy.on('connect', (req, clientSocket, head) => {
    console.log(`[PROXY] Connect request for ${req.url}`);
    const { port, hostname } = new URL(`http://${req.url}`);

    // Connect to the target server
    const serverSocket = net.connect(port, hostname, () => {
        console.log(`[PROXY] Connected to target ${hostname}:${port}`);
        clientSocket.write('HTTP/1.1 200 Connection Established\r\n' + 'Proxy-agent: Node.js-Proxy\r\n' + '\r\n');
        // Pipe data between client and server
        serverSocket.write(head);
        serverSocket.pipe(clientSocket);
        clientSocket.pipe(serverSocket);
    });

    serverSocket.on('error', (err) => {
        console.error(`[PROXY] Server socket error: ${err.message}`);
        clientSocket.end();
    });
});

proxy.listen(1337, '127.0.0.1', () => {
    console.log('[PROXY] Listening on http://127.0.0.1:1337');
});
