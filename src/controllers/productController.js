const { productService } = require("../services");
const { cartService } = require("../services");

exports.addProduct = async (req, res, next) => {
  try {
    await productService.addProduct(req.body);
    res.redirect("/productos/listar");
  } catch {
    res.render("pageNotFound");
  }  
};

exports.getProductForm = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.render("addProduct", { cart: cart });
  } catch {
    res.render("pageNotFound");
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    const cart = await cartService.getCart(req.user.id);
    res.render("productsList", { products: products, cart: cart });
  } catch {
    res.render("pageNotFound");
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const productById = await productService.getProduct(req.params.id);
    res.json(productById);
  } catch {
    res.render("pageNotFound");
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.redirect("/productos/listar");
  } catch {
    res.render("pageNotFound");
  }
};

exports.searchToUpdateProduct = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    const product = await productService.getProduct(req.params.id);
    res.render("editProduct", { product, cart: cart });
  } catch {
    res.render("pageNotFound");
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    await productService.updateProduct(req.params.id, req.body);
    res.redirect("/productos/listar");
  } catch {
    res.render("pageNotFound");
  }
};

exports.filterProductByName = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id)
    const product = await productService.filterByName(req.body.search);
    res.render('productsList', {products: product, cart: cart})
  } catch (error) {
    res.render('pageNotFound')
  }
};

exports.filterProductByCode = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id)
    const product = await productService.filterByCode(req.body.code);
    res.render('productsList', {products: product, cart: cart})
  } catch (error) {
    res.render('pageNotFound')
  }
};

exports.filterProductByPrice = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id)
    const product = await productService.filterByPrice(req.body.min_price, req.body.max_price)
    res.render('productsList', {products: product, cart: cart})
  } catch (error) {
    res.render('pageNotFound')
  }
};

exports.filterProductByStock = async (req, res, next) => {
  try {
    const cart = await cartService.getCart(req.user.id)
    const product = await productService.filterByStock(req.body.min_stock, req.body.max_stock)
    res.render('productsList', {products: product, cart: cart})
  } catch (error) {
    res.render('pageNotFound')
  }
};

