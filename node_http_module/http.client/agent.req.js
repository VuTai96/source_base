const http = require('http');

const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 2,
});

for (let i = 0; i < 5; i++) {
    http.get('http://localhost:3000', { agent }, (res) => {
        console.log(`request ${i} started`);
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(`Request ${i} done, Server said: ${data}`);
        });
    });
}
