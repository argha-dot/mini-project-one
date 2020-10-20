const axios = require('axios');
let User = require('../models/user')
let Product = require('../models/product')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID); 
module.exports = {

    update_user_info(req, res) {
        const {userId, collegeAddress, homeAddress} = req.body;
        User.findOneAndUpdate({_id: userId}, {$set: {homeAddress: homeAddress, collegeAddress: collegeAddress}}).exec(err, user => {
            if(err) {
                return response.status(400).json({
                    error: "Error from updating user info"
                })
            }
        }); 
    }, 

    get_user_info(req, res) {
        return res.status(200).json({
            _id: req.user._id,
                    //isAdmin: req.user.role === 0 ? false : true,
                    //isAuth: true,
                    email: req.user.email,
                    name: req.user.name,
                    //lastname: req.user.lastname,
                    //role: req.user.role,
                    image: req.user.image,
                    cart: req.user.cart,
                   // history: req.user.history
        })
    },

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
                        if (user) { 
                            user.save((err, data) => {  
                                if(err) {res.status(400).json({error: err});}
                                    response 
                                        .status(200)
                                        .json({
                                            loginSuccess: true, user: user
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
                                response.status(200) 
                                        .json({
                                            loginSuccess: true, user: user
                                        });           
                            })
                            
                        }
                    }
                })
            }
        }); 
        // console.log("Token id from Google Login: ", tokenId);
    }, 

    google_logout(req, res) {
        console.log("User ID: from logout: ",  );
        const {userId} = req.body; 
        console.log(userId, req.body); 
        User.findOne({ _id: userId }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
    },

    /***************************AUTH DONE*************************************** */


    /***************************Cart CRUD*************************************** */

    get_cart_info(req, res) {
        const {_id} = req.body;
        User.findOne(
            { _id: _id },
            (err, userInfo) => {
                if (err) {
                    return res.status(400).send(err);
                } 
                let cart = userInfo.cart;
                let array = cart.map(item => {
                    return item.id
                })
    
    
                Product.find({ '_id': { $in: array } })
                    .exec((err, cartData) => {
                        if (err) return res.status(400).send(err);
                        return res.status(200).json({ success: true, cartData, cart: cart })
                    })
    
            }
        )
    },

    remove_from_cart(req, res) {
        const {_id} = req.body;
        User.findOneAndUpdate(
            { _id: _id },
            {
                "$pull":
                    { "cart": { "id": req.query._id } } 
            },
            { new: true },
            (err, userInfo) => {
                if (err) {
                    return res.status(400).send(err);
                }
                let cart = userInfo.cart;
                let array = cart.map(item => {
                    return item.id
                })

                Product.find({ '_id': { $in: array } })
                    .exec((err, cartData) => {
                        return res.status(200).json({
                            cartData,
                            cart
                        })
                    }) 
            }
        )
    },

    add_to_cart(req, res) {
        const {_id} = req.body;
        User.findOne({ _id }, (err, userInfo) => {
            if (err) {
                return res.json({ success: "Error from finding the user - add to cart backend", err });
            }
            let duplicate = false;
    
            // console.log("Message from cart backend", userInfo)
    
            userInfo.cart.forEach((item) => {
                if (item.id == req.query.productId) {
                    duplicate = true;
                }
            })
    
    
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: _id, "cart.id": req.query.productId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.status(200).json(userInfo.cart)
                    }
                )
            } else {
                User.findOneAndUpdate(
                    { _id: _id },
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

    /***************************Cart CRUD Done*************************************** */

    /***************************Wishlist CRUD*************************************** */

    add_to_wishlist(req, res) {
        const {_id} = req.body;
        User.findOne({ _id }, (err, userInfo) => {
            if (err) {
                return res.json({ success: "Error from finding the user - add to wishlist backend", err });
            }
            let duplicate = false;
    
            // console.log("Message from cart backend", userInfo)
    
            userInfo.wishlist.forEach((item) => {
                if (item.id == req.query.productId) {
                    duplicate = true;
                }
            })
    
    
            if (duplicate) {
                res.status(200).json({success: false, error: "item already exists"});
            } else {
                User.findOneAndUpdate(
                    { _id: _id },
                    {
                        $push: {
                            wishlist: {
                                id: req.query.productId,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.status(200).json(userInfo.wishlist)
                    }
                )
            }
        })
    },

    remove_from_wishlist(req, res) {
        const {_id} = req.body;
        User.findOneAndUpdate(
            { _id: _id },
            {
                "$pull":
                    { "wishlist": { "id": req.query._id } } 
            },
            { new: true },
            (err, userInfo) => {
                let wishlist = userInfo.wishlist;
                let array = wishlist.map(item => {
                    return item.id
                })

                Product.find({ '_id': { $in: array } })
                    .exec((err, wishlistDetail) => {
                        return res.status(200).json({
                            wishlistDetail,
                            wishlist
                        })
                    }) 
            }
        )
    },

    
    get_wishlist_info(req, res) {
        const {_id} = req.body;
        User.findOne(
            { _id: _id },
            (err, wishlistInfo) => {
                let wishlist = userInfo.wishlist;
                let array = cart.map(item => {
                    return item.id
                })
    
    
                Product.find({ '_id': { $in: array } })
                    .populate('writer')
                    .exec((err, wishlistInfo) => {
                        if (err) return res.status(400).send(err);
                        return res.status(200).json({ success: true, wishlistInfo, wishlist })
                    })
    
            }
        )
    },

    /***************************Wishlist CRUD Done*************************************** */

    
user_purchase(req, res) {
    let history = [];
    
    req.body.cartData.forEach((item) => {
        history.push({
            purchase_date: Date.now(),
            product_name: item.title,
            product_id: item._id,
            product_price: item.price,
            quantity: item.quantity,
        })
    })




    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })


                async.eachSeries(products, (item, callback) => {
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err })
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartData: []
                    })
                })

            })
        },


    get_history(req, res) {
    User.findOne(
        { _id: req.user._id },
        (err, user) => {
            let history = user.history;
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, history })
        }
    )
},
    post_reviews(req, res) {
        const {userId, productId, rating} = req.body;
        User.findOneAndUpdate(
            { _id: userId }, {
                $push: 
                {reviews: {
                    productId: productId,
                    rating: rating
            }}}, (err, user) => {
                if (err) return res.status(400).send("Error from post-reviews: ", err);
            }
        )

        Product.findOneAndUpdate(
            {_id: productId}, {
            $push:
            {reviews: {
                userId: userId, 
                rating: rating
            }}}, (err, user) => {
                if (err) return res.status(400).send("Error from post-reviews: ", err);
            }
        )
    }, 

    get_reviews(req, res) {
        const userId = req.query.userId;
        User.findById(userId, (err, user) => {
            if (err) return res.status(400).send("Error from get-reviews: ", err);
            return res.status(200).send({reviews: user.reviews}); 
        })
    }
}


