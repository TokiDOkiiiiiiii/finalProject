// Use signinFunction
const { signinFunction } = require('./controllers/storeUserController');
signinFunction(req, res, (err, user) => {
    if (err) {
        console.error(err);
    } else {
        console.log('User signed in:', user);
    }
});


// Use loginFunction
const { loginFunction } = require('./controllers/loginUserController');
loginFunction(req, res, (err, user) => {
    if (err) {
        console.error(err);
    } else {
        console.log('User signed in:', user);
    }
});