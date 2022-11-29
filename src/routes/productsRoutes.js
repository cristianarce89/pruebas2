const express = require('express');
const router = express.Router();
const path = require('path');

const productsController = require('../controllers/productsController');

router.get('/productCart', productsController.productCart);
router.get('/productDetail', productsController.productDetail);
router.get('/productList', productsController.productList);
router.get('/products', productsController.products);
module.exports = router;