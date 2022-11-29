const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {body,check} = require('express-validator');

const usersController = require('../controllers/usersController');

// indicamos en este apartado para guardar archivos con multer el nombre y donde guardarlo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images/users'));
    },
    filename: function (req, file, cb) {
        cb(null, 'UsuariosReeadni-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})
//------------------------------------------------------------------------------------
// EXPRESS VALIDATOR NO FUNCIONAL

// router.post('/register', [
//     body('nombre').notEmpty().withMessage('Exribe tu nombre'),
//     body('email').isEmail().notEmpty().withMessage('Exribe tu nombre'),
//     body('password').notEmpty().withMessage('Exribe tu correo electronico'),
//     body('cellphone').custom(value=> {
//         if (isNaN(value)){
//             throw new Error ('El valor ingresado debe ser un numero')
//         } else{
//             return true
//         }
//     }),
//     body('direccion').notEmpty().withMessage('Exribe tu direccion'),
// ], usersController.store);

router.get('/users', usersController.users);
router.get('/login', usersController.login);
router.post('/login', usersController.loginUser);
router.get('/register', usersController.register);
router.post('/register',upload.single('imagen'), usersController.save);
router.get('/users/ver/:id', usersController.ver);
router.get('/users/userEdit/:id', usersController.edit);
router.post('/users/userEdit/:id', upload.single('imagen'),usersController.update);
router.get('/users/userDelete/:id', usersController.delete);


//---------------------------------------------------------------



module.exports = router;