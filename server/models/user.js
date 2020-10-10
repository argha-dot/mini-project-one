const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema ({
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    username: {type: String, required: true},
    auth0_id: {type: String, required: true},
    auth0_id: {type: String, required: true},
    profile_picture: {type: String},
    cart: {type: Array, default: []} 
});

module.exports = mongoose.model('User', user)
