const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const userAgent = req.headers['user-agent'];
    const acceptLanguage = req.headers['accept-language'];
    //parse the URL
    const parsedURL = url.parse(req.url, true);
    // get different parts of the URL
    const pathname = parsedURL.pathname; // The path without query string
    const query = parsedURL.query; // The query string as an object

    const baseURL = 'http://' + req.headers.host + '/';
    const parsedFullURL = new url.URL(req.url, baseURL);
    const params = parsedFullURL.searchParams;
    console.log(parsedFullURL);

    const queryObj = {
        name: 'Tai Vu',
        age: 29,
        interests: ['Programming', 'music'],
    };
    const queryStr = querystring.stringify(queryObj);

    res.writeHead(200, {
        'content-type': 'text/plain',
    });
    res.end(`
        -----
        User-Agent: ${userAgent}
        Accept-Language: ${acceptLanguage}
        You made a ${req.method} request to ${req.url}
        -----
        fullURL: ${req.url}
        Pathname: ${pathname}
        query: ${JSON.stringify(query)}
        -----
        path: ${parsedFullURL.pathname}
        params: ${params}
        queryStr: ${queryStr}

        `);
});

server.listen(PORT, () => {
    console.log(`Server is listen at http://localhost:${PORT}`);
});
