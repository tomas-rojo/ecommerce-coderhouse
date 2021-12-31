const mongoose = require('mongoose');

const cartDao = ({ cartModel }) => ({
  
    async getCart(id) {

      return cartModel.find({ "user_id" : id });

    },
  
    async addProductToCart(user_id, product) {

      const cart = await cartModel.find({ "user_id" : user_id });

      if (cart.length == 0) {

          try {

                const newCart = await new cartModel

                await newCart.save()

                const last = await newCart._id.toString()
                
                await cartModel.findByIdAndUpdate({"_id": last}, { $set : { "user_id": user_id } } );
                
                return cartModel.updateOne({"user_id" : user_id},{ $push: { "products": product } });

          } catch (error) { return error }

      } else {

        return cartModel.findOneAndUpdate({"user_id" : user_id}, { $push: { "products": product } });

      }
      
    },

    async deleteCart(id) {

      return cartModel.deleteOne({"user_id" : id});

    },
  
    async removeProductFromCart(user_id, product_id) {

        //convierto el user_id en un ObjectId
        let productId = mongoose.Types.ObjectId(product_id);

        await cartModel.updateOne({"user_id" : user_id}, {$pull: {"products": { _id: productId}}})

        const updated_cart = await cartModel.find({"user_id" : user_id});

        return (updated_cart[0].products.length === 0) ? cartModel.deleteOne({"user_id" : user_id}) : updated_cart;
    } 

  });
  
  module.exports = cartDao;
  