import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import session from 'express-session';

const PORT = 3000;
const users = [{ id: 1, username: 'admin', passwordHash: bcrypt.hashSync('123456', 10) }];

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 },
    }),
);

function requireAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.send(`
        <h2>Login</h2>
        <form method="POST" action="/login">
            <input name="username" placeholder="username" required/>
            <input name="password" type="password" placeholder="password" required />
            <button type="submit">Login</button>
        </form>    
    `);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user) {
        return res.send('Wrong username or password');
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
        req.session.userId = user.id;
        res.redirect('/dashboard');
    } else {
        return res.send('Wrong username or password');
    }
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.send(`
        <h2>Welcome to dashboard</h2>
        <p>You have logged in successfully</p> 
        <a href="/logout">Logout</a>   
    `);
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
