const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')

const adminController = require('../controllers/adminController');

// indicamos en este apartado para guardar archivos con multer el nombre y donde guardarlo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images/products'));
    },
    filename: function (req, file, cb) {
        cb(null, 'TenisReeadni-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage})
//------------------------------------------------------------------

router.get('/admin', adminController.admin);
router.get('/productCreate', adminController.productCreate);
router.post('/productCreate',upload.single('imagen'), adminController.save);
router.get('/admin/productDetail/:id', adminController.ver);
router.get('/admin/productEdit/:id', adminController.edit);
router.post('/admin/productEdit/:id', upload.single('imagen'),adminController.update);
router.get('/admin/productDelete/:id', adminController.delete);

module.exports = router;
