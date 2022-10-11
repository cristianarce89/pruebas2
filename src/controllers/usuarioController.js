const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const usuario = require('../../models/usuario.js');

const registrar = async (req, res) => {
    const usuarioC = await usuario.create({
        nombre,
        email,
        password,
        cellphone,
        direccion,
        token: generarId()
    });
}
