const axios = require('axios');
let User = require('../models/user')
let Product = require('../models/product')
const { auth } = require("../middleware/auth");
const jwt = require('jsonwebtoken');
const moment = require('moment');
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID); 
module.exports = {

    google_login(req, response) {
        const {tokenId} = req.body;
        client.verifyIdToken({idToken: tokenId, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID}).then(res => {
            const {email_verified, name, email, picture} = res.payload;
            if (email_verified) {
                User.findOne({email}).exec((err, user) => {
                    if(err) {
                        return response.status(400).json({
                            error: "Error from finding user in google login"
                        })
                    } else {
                        if (user) { // User already exisits:
                            var token = jwt.sign(user._id.toHexString(), 'secret')
                            var oneHour = moment().add(1, 'hour').valueOf();
                        
                            user.tokenExp = oneHour;
                            user.token = token;
                            user.save((err, data) => {  
                                if(err) {res.status(400).json({error: err});}
                                response.cookie("w_authExp", user.tokenExp);
                                    response
                                        .cookie("w_auth", user.token) 
                                        .status(200)
                                        .json({
                                            loginSuccess: true, userId: user._id
                                        }); 
                            });
                        } else {
                            let new_user = new User({
                                name: name,
                                email: email,
                                profile_picture: picture
                            });
                            new_user.save((err, data) => {
                                if(err) {
                                    return res.status(400).json({error: err}); 
                                }
                                data.generateToken((err, user) => {
                                    // if (err) return res.status(400).json({error: err});
                                    response.cookie("w_authExp", user.tokenExp);
                                    response
                                        .cookie("w_auth", user.token)
                                        .status(200) 
                                        .json({
                                            loginSuccess: true, userId: user._id
                                        }); 
                                }); 
                            })
                            
                        }
                    }
                })
            }
        }); 
        console.log("Token id from Google Login: ", tokenId);
    }, 

    remove_from_cart(req, res) {
        User.findOneAndUpdate(
            { _id: req.session.user._id },
            {
                "$pull":
                    { "cart": { "id": req.query._id } } 
            },
            { new: true },
            (err, userInfo) => {
                let cart = userInfo.cart;
                let array = cart.map(item => {
                    return item.id
                })

                Product.find({ '_id': { $in: array } })
                    .populate('writer')
                    .exec((err, cartDetail) => {
                        return res.status(200).json({
                            cartDetail,
                            cart
                        })
                    })
            }
        )
    },

    add_to_cart(req, res) {
        User.findOne({ _id: req.user._id }, (err, userInfo) => {
            let duplicate = false;
    
            console.log(userInfo)
    
            userInfo.cart.forEach((item) => {
                if (item.id == req.query.productId) {
                    duplicate = true;
                }
            })
    
    
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, "cart.id": req.query.productId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.status(200).json(userInfo.cart)
                    }
                )
            } else {
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            cart: {
                                id: req.query.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.status(200).json(userInfo.cart)
                    }
                )
            }
        })
    },


    read_user_data(req, res) {
        if (req.session.user) {
            return res.status(200).json({ success: true, user: req.session.user });
        } else {

        }

    },

    google_logout(req, res) {
        console.log("User ID: from logout: ",  );
        const {userId} = req.body; 
        console.log(userId, req.body); 
        User.findOneAndUpdate({ _id: userId }, { token: "", tokenExp: "" }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
    }
}
 