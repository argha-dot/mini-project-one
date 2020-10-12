const axios = require('axios');
const express = require('express');
const router = express.Router();
const { User } = require('../models/User')
let Product = require('../models/product')
const { auth } = require("../middleware/auth");

// Setting up session: 
const app = express();
const session = require('express-session'); // For saving uses session, manipulating cache

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: null
    }
}));

const async = require('async');

router.get("/read-user-data", (req, res) => {
    if (req.session && req.session.user) {
        return res.status(200).json({success: true, user: req.session.user});
    } else {

    }  
}); 

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        username: req.user.username,
        profile_picture: req.user.image,
        cart: req.user.cart,
    });
});

router.get('/auth/callback', (req, res) => {
    console.log("I am here");
        axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }).then(access_token_response => {
            const access_token = access_token_response.data.access_token // Store token here, collect user info. 
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${access_token}`).then(user_data_response => {
                //Getting the  data from auth0
                const { name, nickname, email, picture, sub } = user_data_response.data;
                console.log('User Info: ', user_data_response.data);

                User.findOne({ auth0_id: sub }, (err, user) => {
                    if (err) console.log('Error from login: ', err);
                    if (!user) {
                        //Create a new user if none exists.
                        let new_user = new User({
                            name: name,
                            email: email,
                            username: nickname,
                            profile_picture: picture,
                            auth0_id: sub,
                            cart: [],
                            token: ''
                        });
                        //Assign the user to the session.
                        req.session.user = new_user;
                        //Save the session
                        req.session.save();
                        //Save user to mongodb
                        new_user.save();
                        console.log("Session Saved- New User!")
                    } else {
                        req.session.user = user;
                        req.session.save();
                        console.log("Session Saved!")
                    }

                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        res.cookie("w_authExp", user.tokenExp);
                        res
                            .cookie("w_auth", user.token)
                            .status(200)
                            .json({
                                loginSuccess: true, userId: user._id
                            });
                    });

                    res.redirect('/');
                    
                })
            }).catch(err => console.log('Error in getting user info - auth0: ', err));
        }).catch(err => console.log('Auth0 Error', err));

});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
    // req.session.destroy();
    // res.status(200).json({message: "Succefully signed out"});
});

router.get('/add_to_cart', auth, (req, res) => {

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
});


router.get('/removeFromCart', auth, (req, res) => {

    User.findOneAndUpdate(
        { _id: req.user._id },
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
})


module.exports = router;


