import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('verbose errors');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/404', (req, res, next) => {
    next();
});

app.get('/403', (req, res, next) => {
    var err = new Error('not allowed!');
    err.status = 403;
    next(err);
});

app.get('/500', function (req, res, next) {
    next(new Error('keyboard cat!'));
});

app.use(function (req, res, next) {
    res.status(404);
    res.format({
        html: function () {
            res.render('404', { url: req.url });
        },
        json: function () {
            res.json({ error: 'Not found' });
        },
        default: function () {
            res.type('txt').send('Not found');
        },
    });
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', { error: err });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
