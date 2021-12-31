const models = require("../models");
const productDao = require("./productDao");
const cartDao = require("./cartDao");
const orderDao = require("./orderDao");

module.exports = {
  productDao: productDao(models),
  cartDao: cartDao(models),
  orderDao: orderDao(models)
};
