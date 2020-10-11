// Imports
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser'); // For retreiving values from req.body
const session = require('express-session'); // For saving uses session, manipulating cache
const cors = require('cors'); // For cross origin requests 
const mongoose = require('mongoose');
const app = express();

// For authentication: 
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');


// Setting controllers: 
const user_controller = require('./controllers/user.controller');
const admin_controller = require('./controllers/admin.controller');
const product_controller = require('./controllers/product.controller');


// Connection with MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.json());
app.use(cors());

// For authentication: 
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-n591a9lw.us.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://dev-n591a9lw.us.auth0.com/`,
    algorithms: ['RS256']
});


// Seting up cookeies usage: 
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: null
    }
}));


// Setting a time limit before endpoints start running
setTimeout(() => {
    app.get('/api/cart/:id', user_controller.add_to_cart);
    app.delete('/api/user-data/cart/:id', user_controller.remove_from_cart);
    app.get('/api/user-data', user_controller.read_user_data);
    app.post('/api/logout', user_controller.logout);
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


