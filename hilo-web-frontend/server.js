const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
//app.use(express.urlencoded({ extended: false }));
// when doing backend chat don't recommend this

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home-page', 'home.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'game-page', 'game.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'signin-page', 'signin.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login-page', 'login.html'));
});

// Serve static files (like CSS and JavaScript)
app.use(express.static(path.join(__dirname, 'home-page')));
app.use(express.static(path.join(__dirname, 'game-page')));
app.use(express.static(path.join(__dirname, 'signin-page')));
app.use(express.static(path.join(__dirname, 'login-page')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
