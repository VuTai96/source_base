const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Request Headers: ', req.headers);

    const userAgent = req.headers['user-agent'];
    const acceptLanguage = req.headers['accept-language'];

    res.writeHead(200, {
        'content-type': 'text/plain',
    });
    res.end(`User-Agent: ${userAgent}\nAccept-Language: ${acceptLanguage}`);
});

server.listen(PORT, () => {
    console.log(`Server is listen at http://localhost:${PORT}`);
});
