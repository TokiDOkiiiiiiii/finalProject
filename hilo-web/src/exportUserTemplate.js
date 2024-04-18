const { signinFunction } = require('./controllers/storeUserController');
const { loginFunction } = require('./controllers/loginUserController');

// Use signinFunction
signinFunction(req, res, (err, user) => {
    if (err) {
        console.error(err);
    } else {
        console.log('User signed in:', user);
    }
});
// Use loginFunction
loginFunction(req, res, (err, user) => {
    if (err) {
        console.error(err);
    } else {
        console.log('User signed in:', user);
    }
});