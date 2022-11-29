const path = require('path');

const productsController = {
    productCart: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productos/productCart'));
    },
    productDetail: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productos/productDetail'));
    },
    productList: (req,res) => {
        res.render(path.resolve(__dirname, '../views/productos/productList'));
    },
    products: (req, res) => {
        res.render(path.resolve(__dirname, '../views/productos/products'));
    }
};

module.exports = productsController;