import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuid4 } from 'uuid';

const PORT = 3000;
const app = express();

// Read cookie
app.use(cookieParser());

// Store temp to save session (for demo node production)
const sessionStore = {};
app.use((req, res, next) => {
    let sessionId = req.cookies.sessionId;
    if (!sessionId || !sessionStore[sessionId]) {
        sessionId = uuid4();
        sessionStore[sessionId] = { views: 0 };
        res.cookie('sessionId', sessionId, { httpOnly: true });
    }
    req.session = sessionStore[sessionId];
    next();
});

app.get('/', (req, res) => {
    req.session.views++;
    res.send(`
        <h1>Xin chào!</h1>
        <p>Bạn đã truy cập trang này ${req.session.views} lần.</p>
        <p><a href="/logout">Đăng xuất</a></p>
    `);
});

app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId;
    if (sessionId) {
        delete sessionStore[sessionId];
        res.clearCookie('sessionId');
    }
    res.send('Bạn đã đăng xuất. <a href="/">Quay lại</a>');
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
