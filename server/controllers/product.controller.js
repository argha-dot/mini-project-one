const Product = require('../models/product');
const express = require('express');
const router = express.Router();
router.get('/seeProducts', (req, res) => {
    Product.find({}).exec((err, products) => {
        if (err) {
            console.log("Error from Prodcut data: ", err);
            return res.status(400).json({ success: false, err })
        }
        // console.log(products);
        return res.status(200).json({ success: true, products })
    });
}); 

router.get('/seeProductById', (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    // console.log("req.query.id", req.query.id)

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    // console.log("productIds", productIds)


    //we need to find the product information that belong to product Id 
    Product.find({ '_id': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })
}); 

// module.exports = {
//     seeProducts(req, res) {
//         Product.find({}).exec((err, products) => {
//             if (err) {
//                 console.log("Error from Prodcut data: ", err);
//                 return res.status(400).json({ success: false, err })
//             }
//             // console.log(products);
//             return res.status(200).json({ success: true, products })
//         });
//     },

//     seeSingleProduct(req, res) {
//         const { id } = req.params;
//         Product.findById(id).exec((err, product) => {
//             if (err) {
//                 console.log("Error from Prodcut data: ", err);
//                 return res.status(400).json({ success: false, err })
//             }
//             // console.log(product);
//             return res.status(200).json({ success: true, product });
//         })
//     }
// }

module.exports = router;