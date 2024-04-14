const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;

//controllers
const viewController = require('./controllers/viewController');
const storeUserController = require('./controllers/storeUserController');

// Middleware to parse request body
//app.use(express.urlencoded({ extended: false }));
// when doing backend chat don't recommend this

//.env
require('dotenv').config();

//Mongodb connectios
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// Define routes
app.get('/', viewController.home);
app.get('/game', viewController.game);
app.get('/signin', viewController.signin);
app.get('/login', viewController.login);
app.post('/signinForm', storeUserController);
app.post('/loginForm', storeUserController);

// Serve static files (like CSS and JavaScript)
app.use(express.static(__dirname + '/views/home-page'));
app.use(express.static(__dirname + '/views/game-page'));
app.use(express.static(__dirname + '/views/signin-page'));
app.use(express.static(__dirname + '/views/login-page'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
