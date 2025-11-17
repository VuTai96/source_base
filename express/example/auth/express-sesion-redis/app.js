const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

// Tạo Redis client
const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: 'redis',
        port: 6379,
    },
});
redisClient.connect().catch(console.error);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Config session using Redis
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false, // save from login --> false
        cookie: {
            secure: false, // true if using https
            httpOnly: true,
            maxAge: 10 * 60 * 1000,
        },
    }),
);

// (Middleware) check authenticated
function isAuthenticated(req, res, next) {
    if (req.session.username) return next();
    res.redirect('/login');
}

// (GET) Page login
app.get('/login', (req, res) => {
    res.send(`
        <form method="POST" action="/login">
            <input name="username" placeholder="Tên đăng nhập" required />
            <button type="submit">Đăng nhập</button>
        </form>
    `);
});

// (POST) login
app.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.username = username; // Session is saving when create value for req.session
    res.send(`Xin chào ${username}! <a href="/private">Vào trang riêng</a>`);
});

// (GET) private page
app.get('/private', isAuthenticated, (req, res) => {
    res.send(`Đây là trang riêng của ${req.session.username}. <a href="/logout">Đăng xuất</a>`);
});

// (GET) Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send('has error when logout!');
        res.clearCookie('connect.sid');
        res.send('Bạn đã đăng xuất. <a href="/login">Đăng nhập lại</a>');
    });
});

// (GET) Delete all session in Redis
app.get('/delete', async (req, res) => {
    try {
        const keys = await redisClient.keys('sess:*');
        if (keys.length === 0) {
            return res.send('No session');
        }
        await Promise.all(keys.map((key) => redisClient.del(key)));
        res.send(`Deleted ${keys.length} session`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Has error when delete session');
    }
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
