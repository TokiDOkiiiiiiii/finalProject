module.exports = {
    // Handler for the home page
    home: (req, res) => {
        res.sendFile('views/home-page/home.html', { root: __dirname + '/../' });
    },
    // Handler for the game page
    game: (req, res) => {
        res.sendFile('views/game-page/game.html', { root: __dirname + '/../' });
    },
    // Handler for the signin page
    signin: (req, res) => {
        res.sendFile('views/signin-page/signin.html', { root: __dirname + '/../' });
    },
    // Handler for the login page
    login: (req, res) => {
        res.sendFile('views/login-page/login.html', { root: __dirname + '/../' });
    }
};
