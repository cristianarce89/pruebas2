import express from 'express';
import mainController from '../controllers/mainController.js';
import { registrar } from '../controllers/usuarioController.js'

const router = express.Router();

router.get('/', mainController.index);


router.get('/login', mainController.login);

router.get('/register', mainController.register);
router.post('/register', registrar);

router.get('/productDetail', mainController.productDetail);
router.get('/productCreate', mainController.productCreate);
router.get('/productEdit', mainController.productEdit);

router.get('/productCart', mainController.productCart);

router.get('/adminPanel', mainController.adminPanel)


export default router;
