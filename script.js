const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your secret key', resave: false, saveUninitialized: true }));

// Routes
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html'); // your login page
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Authenticate user
    authenticateUser(username, password, (error, user) => {
        if (error || !user) {
            res.redirect('/login'); // authentication failed, redirect back to login page
        } else {
            req.session.userId = user.id; // save user id in session
            res.redirect('/'); // authentication successful, redirect to index page
        }
    });
});

app.get('/', (req, res) => {
    if (req.session.userId) {
        res.sendFile(__dirname + '/index.html'); // user is logged in, show index page
    } else {
        res.redirect('/login'); // user is not logged in, redirect to login page
    }
});

// Start server
app.listen(3000, () => console.log('Server listening on port 3000'));

function authenticateUser(username, password, callback) {
    // Implement your user authentication method here
    // Call the callback function with an error (if any) and the authenticated user (if authentication was successful)
}