const Product = require('../models/product');
module.exports = {
    seeProducts(req, res) {
        Product.find({}).exec((err, products) => {
            if (err) {
                console.log("Error from Prodcut data: ", err);
                return res.status(400).json({ success: false, err })
            }
            // console.log(products);
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
            // console.log(product);
            return res.status(200).json({ success: true, product });
        })
    },

    getProducts(req, res) {

        let order = req.body.order ? req.body.order : "desc";
        let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
        let limit = req.body.limit ? parseInt(req.body.limit) : 100;
        let skip = parseInt(req.body.skip);
    
        let findArgs = {};
        let term = req.body.searchTerm;
    
        for (let key in req.body.filters) {
    
            if (req.body.filters[key].length > 0) {
                if (key === "price") {
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1]
                    }
                } else {
                    findArgs[key] = req.body.filters[key];
                }
            }
        }
    
        console.log(findArgs)
    
        if (term) {
            Product.find(findArgs)
                .find({ $text: { $search: term } })
                .populate("writer")
                .sort([[sortBy, order]])
                .skip(skip)
                .limit(limit)
                .exec((err, products) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, products, postSize: products.length })
                })
        } else {
            Product.find(findArgs)
                .populate("writer")
                .sort([[sortBy, order]])
                .skip(skip)
                .limit(limit)
                .exec((err, products) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).json({ success: true, products, postSize: products.length })
                })
        }
    
    }
}
