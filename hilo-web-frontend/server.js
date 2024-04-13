const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: false }));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home-page', 'home.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'game-page', 'game.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login-page', 'login.html'));
});
/*
app.post('/login', (req, res) => {
    // Here you would handle the login logic
    const { username, password } = req.body;
    // Example: Check if username and password match
    if (username === 'admin' && password === 'password') {
        res.send('Login successful!');
    } else {
        res.send('Invalid username or password.');
    }
});
*/
// Serve static files (like CSS and JavaScript)
app.use(express.static(path.join(__dirname, 'hilo-game')));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
