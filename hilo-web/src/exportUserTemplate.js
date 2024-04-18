const { getUser } = require('./userHandler');

// Get the user object
const currentUser = getUser();
console.log('User:', currentUser);