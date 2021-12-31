const express = require('express');
const { 
    addProduct, 
    getProduct, 
    getProductById,
    getProductForm,
    deleteProduct,
    searchToUpdateProduct, 
    updateProduct,
    filterProductByName,
    filterProductByCode,
    filterProductByPrice,
    filterProductByStock,
    marketplace
} = require('../controllers/productController');

const {isAdmin}  = require('../middlewares/isAdmin')

const router = express.Router()

router
    .get('/listar/', getProduct)
    .get('/listar/:id', getProductById)
    .get('/agregar', isAdmin, getProductForm)
    .post('/agregar', isAdmin, addProduct)
    .get('/eliminar/:id', isAdmin, deleteProduct) 
    .get('/modificar/:id', isAdmin, searchToUpdateProduct)
    .post('/modificar/:id', isAdmin, updateProduct) 
    .post('/listar-nombre', filterProductByName)
    .post('/listar-codigo', filterProductByCode)
    .post('/listar-precio', filterProductByPrice)
    .post('/listar-stock', filterProductByStock)

    // ROUTES API REST
    .get('/listar/', getProduct)
    .get('/listar/:id', getProductById)
    .post('/agregar', isAdmin, addProduct)
    .delete('/eliminar/:id', isAdmin, deleteProduct) 
    .patch('/modificar/:id', isAdmin, updateProduct) 

module.exports = router 