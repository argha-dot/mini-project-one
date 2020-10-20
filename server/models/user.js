const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    profile_picture: {type: String},
    cart: {type: Array, default: []}, 
    wishlist: {type: Array, default: []}, 
    collegeAddress: {type: String, default: ""},
    homeAddress: {type: String, default: ""},
    reviews: {type: Array, default: []}
});

module.exports = mongoose.model('User', userSchema); 
