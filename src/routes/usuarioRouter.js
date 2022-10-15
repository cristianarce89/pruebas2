import express from "express";
const router = express.Router();
import { formularioLogin, autenticar, formularioRegistro, registrar, confirmar, formularioRecuperarPassword, resetPassword, comprobarToken, nuevoPassword } from '../controllers/usuarioController.js';

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/login', formularioLogin);
router.post('/login', autenticar); // Al llamar la funcion no es necesario agregarle la sintaxis para llamarla (), solo es necesario llamarla con el nombre

router.get('/register', formularioRegistro);
router.post('/register', registrar);

router.get('/confirmar/:token', confirmar);


router.get('/recuperar-password', formularioRecuperarPassword);
router.post('/recuperar-password', resetPassword);

// Almacenar el nuevo password

router.get('/recuperar-password/:token', comprobarToken);
router.post('/recuperar-password/:token', nuevoPassword);



export default router;
