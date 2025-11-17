const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Setting session middleware
app.use(
    session({
        secret: 'mySecretKey', // Chuỗi bí mật để mã hóa session ID
        resave: false, // Không lưu lại session nếu không thay đổi
        saveUninitialized: true, // Lưu session mới chưa khởi tạo
        cookie: { maxAge: 60000 }, // Cookie hết hạn sau 60 giây
    }),
);

app.get('/', (req, res) => {
    console.log('SessionId:', req.sessionID);
    console.log('SessionBody:', req.session);
    if (req.session.views) {
        req.session.views++;
        res.send(`Bạn đã truy cập ${req.session.views} lần`);
    } else {
        req.session.views = 1;
        res.send('Chào mừng bạn truy cập lần đầu tiên');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
