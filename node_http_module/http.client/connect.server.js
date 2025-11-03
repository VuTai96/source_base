const http = require('http');

server = http.createServer((req, res) => {
    console.log(`[SERVER] Received request: ${req.method} ${req.url}`);

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        if (req.method === 'POST') {
            console.log(`[SERVER] POST - Request body: ${body}`);
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end(
                JSON.stringify({
                    message: 'POST request received',
                    receivedBody: body,
                }),
            );
        } else {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end('Hello from server via GET request!\n');
        }
    });
});

server.listen(3000, () => {
    console.log('[Server] Listening on http://localhost:3000');
});
