const http = require('http');
const PORT = 3000;

// Create a server object
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content Type
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'set-cookie': 'sessionid=abc123; HttpOnly',
    });

    // Send the response body
    res.end('<h1>Hello Tai Vu</h1>');
});

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT} `);
});
