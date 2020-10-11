
const Product = require('../models/product');
const { update } = require('../models/user');
const User  = require('../models/user');

module.exports = {
    getAdminUsers(req, res) {
        User.find().exec((err, users) => {
        if(err) console.log('Error from Admin', err);
        res.status(200).json({users});
       })
      },
      
      // CRUD Operations for products: 
      createProduct(req, res) {
          const {name, description, price} = req.body;
          let new_product = new Product({
              name, 
              description, 
              price,
              category,
              pictures
          });
          new_product.save();
          res.status(200).json({product: new_product});
      },

      updateProduct(req, res) {
        const {id} = req.params; 
        const { name, description, price, category, pictures} = req.body;
        Product.findById(id).exec((err, product) => {
            if(err) {console.log('Error from UpdateProduct Admin', err);}
            product.name = name;
            product.description = description;
            product.price = price;
            product.category = category;
            product.pictures = pictures;
            product.save();
            res.status(200).json({product});
           })
      },

      deleteProduct(req, res) {
          const {id} = req.params;
          Product.deleteOne({_id:id}).exec((err, product) => {
            if(err) {console.log('Error from DeleteProduct Admin', err);}
            res.status(200).json({product});
          });
      }

}
