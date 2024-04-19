const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

//controllers
const viewController = require('./controllers/viewController');
const { signinFunction } = require('./controllers/storeUserController');
const { loginFunction } = require('./controllers/loginUserController');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//.env
require('dotenv').config();

//Mongodb connectios
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// Store active sessions
const activeSessions = {};
// Export activeSessions for use in other files
module.exports.activeSessions = activeSessions;

// Define routes
app.get('/', viewController.home);
app.get('/game', viewController.game);
app.get('/signin', viewController.signin);
app.get('/login', viewController.login);
app.post('/signinForm', (req, res) => {
    signinFunction(req, res, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            console.log('User signed in:', user);
        }
    });
});
app.post('/loginForm', (req, res) => {
    loginFunction(req, res, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            console.log('User signed in:', user);
        }
    });
});

// Serve static files (like CSS and JavaScript)
app.use(express.static(__dirname + '/views/home-page'));
app.use(express.static(__dirname + '/views/game-page'));
app.use(express.static(__dirname + '/views/signin-page'));
app.use(express.static(__dirname + '/views/login-page'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});