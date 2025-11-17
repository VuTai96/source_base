const express = require('express');
const path = require('path');
const POST = 3000;

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public2')));

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
