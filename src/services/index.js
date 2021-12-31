const productService = require("./product");
const cartService = require("./cart");
const orderService = require("./order");
let persistence = require("../dal")();

module.exports = {
  productService: productService(persistence),
  cartService: cartService(persistence),
  orderService: orderService(persistence),
};
