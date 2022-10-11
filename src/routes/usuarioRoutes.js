const express = require('express');
const { registrar } = require('../controllers/usuarioController.js')
const router = express.Router();

router.get('/register', registrar);
router.post('/register', registrar);

module.exports = router;