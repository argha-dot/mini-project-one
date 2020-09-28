const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema ({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    price: {type: Number, required: true},
    picture: {type: String}
}); 

module.exports = mongoose.model('Product', product);
