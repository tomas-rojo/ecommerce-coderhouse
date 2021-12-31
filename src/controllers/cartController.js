const { sendMailWithNewCart } = require('../services/sendMailWithNewCart')
const { sendWhatsappToAdmin } = require("../services/sendSmsWithTwilio");
const { sendSmsToUser } = require("../services/sendSmsWithTwilio");

const { cartService } = require("../services");
const { productService } = require("../services");
const { orderService } = require('../services')


exports.addToCart = async (req, res, next) => {
  const product = await productService.getProduct(req.params.id);
  await cartService.addProductToCart(req.user.id, product)
  res.redirect('/carrito/listar')
};


exports.getCart = async (req, res, next) => {
    await orderService.getOrder(req.user.id)
    const cart = await cartService.getCart(req.user.id)
    res.render('carrito', {cart: cart})
};


exports.deleteCart = async (req, res, next) => {
  await cartService.deleteCart(req.user.id)
  res.redirect('/carrito/listar')
};


exports.deleteProductFromCart = async (req, res, next) => {
  await cartService.deleteProductFromCart(req.user.id, req.params.id)
  res.redirect('/carrito/listar')
};


exports.checkoutCart = async (req, res, next) => {
  const cart = await cartService.getCart(req.user.id)
  await cartService.deleteCart(req.user.id)
  sendMailWithNewCart(cart, req.user.name)
  sendWhatsappToAdmin(req.user.name, req.user.email)
  sendSmsToUser(req.user.phone_number)
  res.render('checkout_success', { cart: undefined })

};
