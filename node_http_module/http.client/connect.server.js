const http = require('http');

server = http.createServer((req, res) => {
    console.log(`[SERVER] Received request: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from the real server!\n');
});

server.listen(3000, () => {
    console.log('[Server] Listening on http://localhost:3000');
});
