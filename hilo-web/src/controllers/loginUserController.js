const User = require('../models/User');
const activeSessions = require('../server');

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

module.exports = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((user) => {
        if (user) {
            if (password === user.password) {
                // Generate a unique session ID
                const sessionId = generateSessionId();
                // Store session ID in activeSessions
                activeSessions[sessionId] = { userId: user._id };
                // Set session ID in cookie
                res.cookie('sessionId', sessionId, { httpOnly: true });

                res.redirect('/');
            } else {
                //return res.status(400).send("Incorrect password");
                res.redirect('/login');
            }
        } else {
            //return res.status(400).send("User not found");
            res.redirect('/login');
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    });
};
