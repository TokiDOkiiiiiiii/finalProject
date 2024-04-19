let currentUser;

module.exports = {
    setUser: (user) => {
        currentUser = user;
        console.log('cacheUser:', currentUser);
    },
    getUser: () => {
        return currentUser;
    },
    handleUser: () => {
        if (currentUser) {
            console.log('User:', currentUser);
            // Any other operations you need to perform with the user object
        } else {
            console.log('No user currently set.');
        }
    }
};