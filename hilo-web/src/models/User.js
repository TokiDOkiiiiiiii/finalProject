const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }
});

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    }).catch(err => {
        console.error(err);
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;