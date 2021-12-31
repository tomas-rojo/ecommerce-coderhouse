const cartService = ({ cartDao }) => ({

    async addProductToCart(userID, product) {

        return cartDao.addProductToCart(userID, product);

    },
  
    async getCart(userID) {
      
        const cart = await cartDao.getCart(userID);

        return (cart.length == 0) ? undefined : cart

    },

    async deleteProductFromCart(userID, productID) {

        return cartDao.removeProductFromCart(userID, productID);

    },

    async deleteCart(userID) {

        return cartDao.deleteCart(userID);

    },

  });
  
  module.exports = cartService;
  