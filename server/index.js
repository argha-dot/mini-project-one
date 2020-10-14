// Imports
const express = require('express');
const {auth} = require('./middleware/auth')

require('dotenv').config();
const bodyParser = require('body-parser'); // For retreiving values from req.body
const cors = require('cors'); // For cross origin requests 
const mongoose = require('mongoose');
const app = express();

// For authentication: 
const cookieParser = require("cookie-parser");


// Setting controllers: 
const user_controller = require('./controllers/user.controller');
const admin_controller = require('./controllers/admin.controller');
const product_controller = require('./controllers/product.controller');


// Connection with MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);

const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());





// Setting a time limit before endpoints start running
setTimeout(() => {
    app.post('/api/google_login', user_controller.google_login);
    app.post('/api/google_logout', user_controller.google_logout);

    app.post('/api/cart', user_controller.add_to_cart);
    app.delete('/api/cart', user_controller.remove_from_cart);
    app.get('/api/see_cart:id' , user_controller.get_cart_info);

    app.post('/api/wishlist', user_controller.add_to_wishlist);
    app.delete('/api/wishlist', user_controller.remove_from_wishlist);
    app.get('/api/see_wishlist:id' , user_controller.get_wishlist_info);

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


 