const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const usuarioRoutes = require('./usuarioRoutes.js');

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/productDetail', mainController.productDetail);
router.get('/productCart', mainController.productCart);
router.get('/productCreate', mainController.productCreate);
router.get('/productEdit', mainController.productEdit);

module.exports = router;
