const express = require('express')
const Router = express.Router()

// Import All Controller
const {productController} = require('../controller') // Akan otomatis mengambil file index.js nya
const upload = require('../middleware/upload')
Router.get('/get',productController.getAllProduct)
Router.post('/postnew',upload,productController.newProduct)
Router.post('/add',productController.addToCart)
Router.get('/getcart',productController.getCart)
Router.delete('/delete-cart',productController.deleteCart)

module.exports = Router