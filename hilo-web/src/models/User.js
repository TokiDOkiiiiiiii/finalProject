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
        default: 0
    },
    Ranking: {
        type: Number,
        default: 0
    },
    rollingTime: {
        type: Number,
        default: 0
    },
    highMul: {
        type: Number,
        default: 0
    },
    lowMul: {
        type: Number,
        default: 0
    },
    hiloMul: {
        type: Number,
        default: 0
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