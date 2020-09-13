const {Schema, model} = require('mongoose');

const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    ip: {type: String, required: true},
    link_id: {type: Number, required: true},
    date: {type: Date, default: Date.now},
    country: {type: String, required: true},
    campaign: {type: String, default: null},
    source: {type: String, default: null},
    media: {type: String, default: null},
    content: {type: String, default: null},
    ftd: {type: Number, default: 0},
    domain: {type: String, required: true},
    success: {type: Boolean, default: null},
    id: {type: String, default: null},
    autologin: {type: String, default: null},
    password: {type: String, default: null},
    error: {type: String, default: null},
    message: {type: String, default: null}

});

module.exports = model('AffboatData', schema);