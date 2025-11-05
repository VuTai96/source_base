const http2 = require('http2');
const fs = require('fs');
const path = require('path');

const server = http2.createSecureServer({
    key: fs.readFileSync(path.join(__dirname, '../ssl/localhost-privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/localhost-cert.pem')),
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
    const method = headers[':method'];
    const urlPath = headers[':path'];

    console.log(`➡️  ${method} ${urlPath}`);

    if (method === 'GET' && urlPath === '/') {
        stream.respond({
            'content-type': 'application/json',
            ':status': 200,
        });
        stream.end(JSON.stringify({ message: 'Hello from HTTP/2 GET!' }));
    } else if (method == 'POST' && urlPath === '/data') {
        // stream.setEncoding('utf8');
        let body = '';
        stream.on('data', (chunk) => {
            body += chunk;
        });
        stream.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                console.log('📦 Received POST data:', parsed);
                stream.respond({
                    'content-type': 'application/json',
                    ':status': 200,
                });
                stream.end(JSON.stringify({ received: parsed }));
            } catch (error) {
                stream.respond({
                    ':status': 400,
                });
                stream.end('Invalid JSON');
            }
        });
    }
});

server.listen(8443, () => {
    console.log('✅ HTTP/2 server running on https://localhost:8443');
});
