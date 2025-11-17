const express = require('express');
const POST = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    res.send('Got a POST request');
});

app.put('/user', (req, res) => {
    res.send('Got a PUT at /user');
});

app.delete('/user', (req, res) => {
    res.send('Got a DELETE rerquest at /user');
});

app.listen(POST, () => {
    console.log(`[Server] is listening on http://localhost:${POST}`);
});
