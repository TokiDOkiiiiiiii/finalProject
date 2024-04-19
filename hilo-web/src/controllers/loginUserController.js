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
    loginFunction: (req, res, callback) => {
        const { username, password } = req.body;

        User.findOne({ username: username, password: password }).then((foundedUser) => {
            if (foundedUser) {
                // Set the value of user
                //module.exports.user = foundedUser;
                console.log(foundedUser);
                // Generate a unique session ID
                //const sessionId = generateSessionId();
                // Store session ID in activeSessions
                //activeSessions[sessionId] = { userId: foundedUser._id };
                // Set session ID in cookie
                //res.cookie('sessionId', sessionId, { httpOnly: true });
                res.cookie('sessionId', foundedUser);

                // Call the callback function with foundedUser as an argument
                //callback(null, foundedUser);
                //setUser(foundedUser);

                res.redirect('/');
            } else {
                //return res.status(400).send("User not found");
                res.redirect('/login');
            }
        }).catch(err => {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        });
    }
};