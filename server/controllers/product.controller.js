const Product = require('../models/product');

module.exports = {

    see_products(req, res) {
        Product.find({}).exec((err, products) => {
            if (err) {
                console.log("Error from Product data: ", err);
                return res.status(400).json({ success: false, err })
            }
            return res.status(200).json({ success: true, products })
        });
    },

    see_single_product(req, res) {
        const { id } = req.params;
        Product.findById(id).exec((err, product) => {
            if (err) {
                console.log("Error from Product data: ", err);
                return res.status(400).json({ success: false, err })
            }
            return res.status(200).json({ success: true, product });
        })
    },

    get_rating(req, res) {
        const userId = req.query.productId;
        Product.findById(userId, (err, product) => {
            if (err) return res.status(400).send("Error from get-reviews: ", err);
            return res.status(200).send({reviews: product.reviews}); 
        })
    }

}
