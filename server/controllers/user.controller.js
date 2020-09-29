const axios = require('axios');
let User = require('../models/user')

// user_controller.get("/", (req, res) => {
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
//     console.log("Working");
//   });

module.exports = {
login(req, res) {
    return axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code', 
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }).then(access_token_response => {
        const access_token = access_token_response.data.access_token // Store token here, collect user info.

        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`).then(user_data_response => {
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
                        auth0_id: sub
                    });
                    //Assign the user to the session.
                    req.session.user = new_user;
                    //Save the session
                    req.session.save();
                    //Save user to mongodb
                    new_user.save();
                }
                req.session.user = user;
                req.session.save();
                res.redirect('/');
            })
 }).catch(err => console.log('Error in getting user info - auth0: ', err));
    }).catch(err => console.log('Auth0 Error', err));
    }
}
