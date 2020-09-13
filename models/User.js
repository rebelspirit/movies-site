const {Schema, model} = require('mongoose');

const schema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    history: {type: Array, default: []},
    admin: {type: Boolean, default: false},
    sounds: {type: Boolean, default: true},
    nightMode: {type: Boolean, default: true}

});

module.exports = model('User', schema);