const express = require('express')
const Router = express.Router()

// Import All Controller
const {userController} = require('../controller') // Akan otomatis mengambil file index.js nya

Router.get('/test',userController.login)

module.exports = Router