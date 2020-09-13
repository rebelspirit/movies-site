const {Schema, model} = require('mongoose');

const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    af: {type: String, required: true},
    country: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, default: Date.now},
    click_id: {type: String, default: null},
    partner_click_id: {type: String, default: null},
    campaign: {type: String, default: null},
    source: {type: String, default: null},
    media: {type: String, default: null},
    content: {type: String, default: null},
    domain: {type: String, required: true},
    status: {type: String, default: null},
    id: {type: Number, default: null}
});

module.exports = model('WalkData', schema);