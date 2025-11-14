const express = require('express');
const POST = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(POST, () => {
    console.log(`[Server] is listening on http://localhost:${POST}`);
});
