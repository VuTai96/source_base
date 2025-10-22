const http = require('http');
const PORT = 3000;

// Create a server object
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content Type
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body
    res.end('Hello Tai Vu\n');
});

// Start the server and listen on the specified port
server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT} `);
});
