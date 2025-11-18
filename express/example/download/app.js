import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILES_DIR = path.join(__dirname, 'files');

const app = express();

app.get('/', function (req, res) {
    res.send(
        '<ul>' +
            '<li>Download <a href="/files/notes/groceries.txt">notes/groceries.txt</a>.</li>' +
            '<li>Download <a href="/files/amazing.txt">amazing.txt</a>.</li>' +
            '<li>Download <a href="/files/missing.txt">missing.txt</a>.</li>' +
            '<li>Download <a href="/files/CCTV大赛上海分赛区.txt">CCTV大赛上海分赛区.txt</a>.</li>' +
            '</ul>',
    );
});

app.get('/files/*file', function (req, res, next) {
    console.log(req.params);
    console.log(req.params.file);
    console.log(FILES_DIR);
    res.download(req.params.file.join('/'), { root: FILES_DIR }, function (err) {
        if (!err) return; // file sent
        if (err.status !== 404) return next(err); // non-404 error
        // file for download not found
        res.statusCode = 404;
        res.send('Cant find that file, sorry!');
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
