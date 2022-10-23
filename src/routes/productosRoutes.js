import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar, editar, guardarCambios, eliminar } from '../controllers/productoController.js'

const router = express.Router();

router.get('/products', (req,res) => {
    res.render('productos/products');
});

router.get('/productDetail', (req, res) => {
    res.render('productos/productDetail');
})

router.get('/productList', (req, res) => {
    res.render('productos/productList');
})

router.get('/adminPanel', admin)
router.get('/productCreate', crear);
router.post('/ProductCreate', guardar);

router.get('/productos/editar/:id',
    editar
);

router.post('/productos/editar/:id',
    guardarCambios
);

router.post('/productos/eliminar/:id',
    eliminar
);

export default router;