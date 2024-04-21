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

async function simulateBcrypt(password, saltRounds) {
    console.log('simulateBcrypt');
    const encoder = new TextEncoder();

    // Generate a random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Encode password as Uint8Array
    let hash = encoder.encode(password);
    let salted = new Uint8Array(hash.length + salt.length);
    salted.set(hash);
    salted.set(salt, hash.length);
    console.log(salted);
    // Perform multiple rounds of hashing
    for (let i = 0; i < saltRounds; i++) { // Default rounds to 10 if saltRounds is undefined
        console.log('begin')
        hash = await crypto.subtle.digest('SHA-256', salted);
        salted = new Uint8Array(hash.byteLength + salt.byteLength);
        salted.set(new Uint8Array(hash));
        salted.set(salt, hash.byteLength);
    }
    console.log('end')
    // Convert the final hash to a hex string and append the salt as hex
    const hashHex = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    const saltHex = Array.from(salt)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    return hashHex + saltHex;
}

// Example usage:


module.exports = {
    signinFunction: async (req, res, callback) => {
        const { username, password } = req.body;

        User.findOne({ username: username, password: password }).then(async (user) => {
            if (user) {
                res.redirect('/login')
            } else {

                User.create({
                    ...req.body,
                    password: await simulateBcrypt(req.body.password, 1)
                }).then((createdUser) => {

                    // Generate a unique session ID
                    const sessionId = generateSessionId();
                    // Store session ID in activeSessions
                    activeSessions[sessionId] = { userId: createdUser._id };
                    // Set session ID in cookie
                    //res.cookie('sessionId', sessionId, { httpOnly: true });
                    res.cookie('sessionId', createdUser);

                    // Call the callback function with createdUser as an argument
                    callback(null, createdUser);
                    //setUser(createdUser);

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