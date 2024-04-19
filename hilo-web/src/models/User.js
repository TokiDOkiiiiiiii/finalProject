const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    Score: {
        type: Number,
        default: 100
    },
    Ranking: {
        type: Number,
        default: 0
    },
    rollingTime: {
        type: Number,
        default: 15
    },
    highMul: {
        type: Number,
        default: 3
    },
    lowMul: {
        type: Number,
        default: 2
    },
    hiloMul: {
        type: Number,
        default: 5
    },
    baseAdd: {
        type: Number,
        default: 0
    },
    autoDice: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;