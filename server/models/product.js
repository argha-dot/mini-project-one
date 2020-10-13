const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema ({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    price: {type: String, required: true},
    pictures: {type: Array, default: []},
    category: {type: String, required: true, default: "misc"} 
}); 

module.exports = mongoose.model('Product', product);
 
