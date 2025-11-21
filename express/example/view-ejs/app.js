import express from 'express';
import ejs from 'ejs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.html', ejs.__express); //If views extension is .ejs => not need this command
app.set('view engine', 'html'); // set default is .html --> call .render(a.ejs) for a.ejs & .render(b) for b.html;
app.set('views', path.join(__dirname, 'views'));

var users = [
    { name: 'tobi', email: 'tobi@learnboost.com' },
    { name: 'loki', email: 'loki@learnboost.com' },
    { name: 'jane', email: 'jane@learnboost.com' },
];

app.get('/', (req, res) => {
    res.render('users', {
        users,
        title: 'EJS example',
        header: 'Some users',
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
