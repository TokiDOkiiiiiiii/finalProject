const User = require('../models/User');
const activeSessions = require('../server');
const { setUser } = require('./getUserController');

function generateSessionId() {
    // Generate a random string for session ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const sessionIdLength = 20;
    let sessionId = '';
    for (let i = 0; i < sessionIdLength; i++) {
        sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sessionId;
}

module.exports = {
    signinFunction: (req, res, callback) => {
        const { username, password } = req.body;

        User.findOne({ username: username, password: password }).then((user) => {
            if (user) {
                res.redirect('/login')
            } else {
                User.create(req.body).then((createdUser) => {

                    // Generate a unique session ID
                    const sessionId = generateSessionId();
                    // Store session ID in activeSessions
                    activeSessions[sessionId] = { userId: createdUser._id };
                    // Set session ID in cookie
                    res.cookie('sessionId', sessionId, { httpOnly: true });

                    // Call the callback function with createdUser as an argument
                    callback(null, createdUser);
                    setUser(createdUser);

                    res.redirect('/');
                }).catch(err => {
                    console.error(err);
                    res.status(500).send("Error creating user. Please try again later.");
                });
            }
        }).catch(err => {
            console.error(err);
            if (!req.body.username && !req.body.password) {
                return res.status(400).send("Please provide both username and password.");
            } else if (!req.body.username) {
                return res.status(400).send("Please provide username.");
            } else if (!req.body.password) {
                return res.status(400).send("Please provide password.");
            }else {
                res.status(500).send("Something went wrong. Please try again later.");
            }
        });
    },
};