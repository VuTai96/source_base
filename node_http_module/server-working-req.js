const http = require('http');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const userAgent = req.headers['user-agent'];
    const acceptLanguage = req.headers['accept-language'];
    //parse the URL
    const parsedURL = url.parse(req.url, true);
    // get different parts of the URL
    const pathname = parsedURL.pathname; // The path without query string
    const query = parsedURL.query; // The query string as an object

    res.writeHead(200, {
        'content-type': 'text/plain',
    });
    res.end(`
        User-Agent: ${userAgent}
        Accept-Language: ${acceptLanguage}
        You made a ${req.method} request to ${req.url}
        -----
        fullURL: ${req.url}
        Pathname: ${pathname}
        query: ${JSON.stringify(query)}
        `);
});

server.listen(PORT, () => {
    console.log(`Server is listen at http://localhost:${PORT}`);
});
