const http = require('http');
const { URL } = require('url');

const PORT = 3000;

// In-memory data store (for demonstration)
let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build an API', completed: false },
];

const server = http.createServer((req, res) => {
    // Set CORS headers (for development)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    // Handle preflight requests
    if (method == 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    if (method == 'GET' && pathname == '/todos') {
        // Rout: GET /todos
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } else if (method == 'POST' && pathname == '/todos') {
        // Rout: POST /todos
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newTodo = JSON.parse(body);
                newTodo.id = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
                todos.push(newTodo);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newTodo));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else if (method == 'PUT' && pathname.startsWith('/todos/')) {
        // Rout: PUT /todos/:id
        const id = parseInt(pathname.split('/')[2]);
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const updatedTodo = JSON.parse(body);
                const index = todos.findIndex((t) => t.id == id);
                if (index == -1) {
                    res.writeHead(404, { 'content-type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Todo not found' }));
                } else {
                    todos[index] = { ...todos[index], ...updatedTodo };
                    res.writeHead(200, { 'content-type': 'application/json' });
                    res.end(JSON.stringify(todos[index]));
                }
            } catch (error) {
                res.writeHead(400, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    } else if (method == 'DELETE' && pathname.startsWith('/todos/')) {
        // Rout: DELETE /todos/:id
        const id = parseInt(pathname.split('/')[2]);
        const index = todos.findIndex((t) => (t.id = id));
        if (index == -1) {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ error: 'Todo not found' }));
        } else {
            todos = todos.filter((t) => t.id !== id);
            res.writeHead(204);
            res.end();
        }
    } else {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
