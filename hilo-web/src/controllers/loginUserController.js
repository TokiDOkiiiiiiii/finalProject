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

async function verifyPassword(providedPassword, storedHashWithSalt, saltRounds) {
    const encoder = new TextEncoder();

    // Extract the salt from the stored hash
    // Assuming the salt is the last 32 characters (since it's a hex representation of 16 bytes)
    const saltHex = storedHashWithSalt.slice(-32);
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    // Encode the provided password
    let hash = encoder.encode(providedPassword);
    let salted = new Uint8Array(hash.length + salt.length);
    salted.set(hash);
    salted.set(salt, hash.length);

    // Perform the same number of rounds of hashing as was done in the original hashing
    for (let i = 0; i < saltRounds; i++) {
        hash = await crypto.subtle.digest('SHA-256', salted);
        salted = new Uint8Array(hash.byteLength + salt.byteLength);
        salted.set(new Uint8Array(hash));
        salted.set(salt, hash.byteLength);
    }

    // Convert the final hash to a hex string
    const hashHex = Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    // Generate the full hash + salt string to compare with the stored version
    const fullHash = hashHex + saltHex;

    // Compare the newly generated hash + salt string with the stored hash
    return fullHash === storedHashWithSalt;
}

module.exports = {
    loginFunction: (req, res, callback) => {
        const { username, password } = req.body;

        User.findOne({ username: username}).then((foundedUser) => {
            if (foundedUser) {
                // Set the value of user
                //module.exports.user = foundedUser;
                console.log(foundedUser);
                if (!verifyPassword(password, foundedUser.password, 1)) {
                    res.redirect('/login?error=401');
                    return;
                }
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
                res.redirect('/login?error=401');
                // res.redirect('/login');
            }
        }).catch(err => {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        });
    }
};