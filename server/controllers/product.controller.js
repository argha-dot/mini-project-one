const Product = require('../models/product');
module.exports = {
    seeProducts(req, res) {
        Product.find({}).exec((err, products) => {
            if (err) {
                console.log("Error from Prodcut data: ", err);
                return res.status(400).json({ success: false, err })
            }
            console.log(products);
            return res.status(200).json({ success: true, products })
        });
    },

    seeSingleProduct(req, res) {
        const { id } = req.params;
        Product.findById(id).exec((err, product) => {
            if (err) {
                console.log("Error from Prodcut data: ", err);
                return res.status(400).json({ success: false, err })
            }
            console.log(product);
            return res.status(200).json({ success: true, product });
        })
    }
}
