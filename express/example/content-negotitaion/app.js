import express from 'express';
import users from './db.js';

const app = express();

app.get('/', (req, res) => {
    res.format({
        html: function () {
            res.send(
                '<ul>' +
                    users
                        .map(function (user) {
                            return '<li>' + user.name + '</li>';
                        })
                        .join('') +
                    '</ul>',
            );
        },
        text: function () {
            res.send(
                users
                    .map(function (user) {
                        return ' - ' + user.name + '\n';
                    })
                    .join(''),
            );
        },
        json: function () {
            res.json(users);
        },
    });
});

function format(path) {
    return async function (req, res) {
        const obj = await import(path);
        res.format(obj.default);
    };
}
app.get('/users', format('./users.js'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

/**
 * Change Accept: text/html | text/plain | application/json to watch result by format
 * Request:
 * curl -Uri "http://localhost:3000" `
  -Method GET `
  -Headers @{Accept="application/json"; "Content-Type"="application/json"}
 */
