const User = require('../models/User');

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log("User registered successfully!");
        res.redirect('/');
    }).catch((err) => {
        //console.log(err.errors);

        if (error) {
            
        }
    });
};