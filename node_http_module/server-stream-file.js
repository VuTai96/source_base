const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
    // Get the file path from the URL
    const filePath = path.join(__dirname, req.url);
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 400;
            res.end('File not found');
            return;
        }
        fs.stat(filePath, (err, stats) => {
            if (err) {
                res.statusCode = 500;
                res.end('Server error');
                return;
            }
            res.setHeader('Content-length', stats.size);
            res.setHeader('Content-Type', 'application/octet-stream');
            const stream = fs.createReadStream(filePath);
            stream.on('error', (err) => {
                console.error('Error reading file:', err);
                if (!res.headersSent) {
                    res.statusCode = 500;
                    res.end('Error reading file');
                }
            });
            stream.pipe(res);
        });
    });
});

server.listen(PORT, () => {
    console.log(`File server running at http://localhost:${PORT}/`);
});
