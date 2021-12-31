const express = require('express');

const { 
    addToCart, 
    getCart, 
    deleteCart, 
    deleteProductFromCart,
    checkoutCart
} = require('../controllers/cartController');

const router = express.Router()

router
    .get('/listar/', getCart)
    .get('/agregar/:id', addToCart)
    .get('/eliminar/:id', deleteProductFromCart)
    .get('/vaciar', deleteCart)
    .get('/checkout', checkoutCart)

    // ROUTES API REST
    // .get('/listar/', getCart)
    // .post('/agregar/:id', addToCart)
    // .patch('/eliminar/:id', deleteProductFromCart)
    // .delete('/vaciar', deleteCart)
    
module.exports = router