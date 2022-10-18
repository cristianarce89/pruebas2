import express from 'express';
import { body } from 'express-validator';
import { admin, crear, guardar } from '../controllers/productoController.js'

const router = express.Router();

router.get('/productCreate', (req, res) => {
    res.render('productos/productCreate');
});

router.get('/productDetail', (req, res) => {
    res.render('productos/productDetail');
})

router.get('/adminPanel', (req, res) => {
    res.render('admin/adminPanel');
})

router.get('/productList', (req, res) => {
    res.render('productos/productList');
})

router.get('/productos/productCreate', crear);
router.post('/productos/ProductCreate', guardar);

// router.get('/propiedades/agregar-imagen/:id', 
//     protegerRuta,
//     agregarImagen
// );

// router.post('/propiedades/agregar-imagen/:id',
//     protegerRuta,
//     upload.single('imagen'),
//     almacenarImagen
// )

// router.get('/propiedades/editar/:id',
//     protegerRuta,
//     editar
// )

export default router;