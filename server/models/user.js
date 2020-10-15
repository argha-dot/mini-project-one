const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {type: String, required: true}, 
    email: {type: String, required: true}, 
    // username: {type: String, required: true},
    // auth0_id: {type: String, required: true},
    // auth0_id: {type: String, required: true},
    profile_picture: {type: String},
    cart: {type: Array, default: []}, 
    wishlist: {type: Array, default: []}, 
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function (err, decode) {
        user.findOne({ "_id": decode, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        })
    })
}

module.exports = mongoose.model('User', userSchema); 
