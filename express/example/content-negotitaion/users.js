import users from './db.js';

export default {
    html: function (req, res) {
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
    text: function (req, res) {
        res.send(
            users
                .map(function (user) {
                    return ' - ' + user.name + '\n';
                })
                .join(''),
        );
    },
    json: function (req, res) {
        res.json(users);
    },
};
