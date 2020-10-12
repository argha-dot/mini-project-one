const Product = require('../models/product');
module.exports = {
    seeProducts(req, res) {
        Product.find({}).exec((err, products) => {
        if (err) {console.log("Error from Prodcut data: ", err);}
        console.log(products);
        res.status(200).json({products})
        });
    }, 

    seeSingleProduct(req, res) {
        const {id} = req.params;
        Product.findById(id).exec((err, product) => {
            if (err) {console.log("Error from Prodcut data: ", err);}
            console.log(product);
            res.status(200).json({product});
        })  
    }
}
