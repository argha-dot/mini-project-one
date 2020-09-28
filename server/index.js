// Imports
const express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser"); // For retreiving values from req.body
const session = require('express-session'); // For saving uses session, manipulating cache
const cors = require('cors'); // For cross origin requests 
const mongoose = require('mongoose');
// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

const app = express();

// Setting controllers: 
const user_controller = require('./controllers/user.controller');
const admin_controller = require('./controllers/admin.controller');
const product_controller = require('./controllers/product.controller'); 


// Use your dependencies here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); 

// Connection with MongoDB Atlas
const uri = process.env.ATLAS_URI; //Not working for some reason, when using URI, gives an error. 
mongoose.connect(uri,
 { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Configure Passport to use Auth0
// var strategy = new Auth0Strategy(
//   {
//     domain: process.env.AUTH0_DOMAIN,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL:
//       process.env.AUTH0_CALLBACK_URL || 'http://localhost:5000/callback'
//   }, 
// );


// Seting up cookeies usage: 
var sess = {
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: -1
    }
};



// Setting a time limit before endpoints start running
setTimeout(() => {
// app.get('/api/user-data', user_controller.readUserData);
// app.post('/api/user-data/cart', user_controller.addToCart);
// app.delete('/api/user-data/cart/:id', user_controller.removeFromCart);
// app.post('/api/login', user_controller.login)
// app.post('/api/logout', user_controller.logout);
// app.post('/api/login', user_controller.login);
app.get('/auth/callback', user_controller.login);
app.get('/api/products', product_controller.seeProducts);
app.get('/api/products/:id', product_controller.seeSingleProduct);
app.get('/api/users', admin_controller.getAdminUsers);
app.post('/api/products', admin_controller.createProduct);
app.put('/api/products/:id', admin_controller.updateProduct);
app.delete('/api/products/:id', admin_controller.deleteProduct);
    }, 200)


// Start Server here
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
 });


