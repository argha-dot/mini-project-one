const axios = require('axios');
let User = require('../models/user')
let Product = require('../models/product')

module.exports = {

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
        console.log("Id:", req.session.user._id);
        User.find({ _id: req.session.user._id }, (err, userInfo) => {

            let duplicate = false;
            userInfo.cart.forEach((cartInfo) => {
                if (cartInfo.id === req.query.productId) {
                    duplicate = false;
                }
            })

            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.session.user._id, "cart.id": req.query.productId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true },
                    () => {
                        if (err) return res.json({ success: false, err });
                        return res.json(userInfo.cart);
                    }
                )
            } else {
                User.findOneAndUpdate(
                    { _id: req.session.user._id },
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

    login(req, res) {
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
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
                    res.redirect('/');
                })
            }).catch(err => console.log('Error in getting user info - auth0: ', err));
        }).catch(err => console.log('Auth0 Error', err));
    },

    logout(req, res) {
        req.session.destroy();
        res.status(200).json({ message: "Succefully signed out" });
    }
}
