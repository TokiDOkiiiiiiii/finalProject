const User = require('../models/User');

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        //console.log("User registered successfully!");
        res.redirect('/');
    }).catch((err) => {
        //console.error(err);
        if (!req.body.username || !req.body.password) {
            return res.status(400).send("Please provide both username and password.");
        } else {
            res.status(500).send("Something went wrong. Please try again later.");
        }
    });
};