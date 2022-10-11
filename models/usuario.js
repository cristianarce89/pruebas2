const { DataTypes } = require('sequelize');
const db = require('../config/db.js');
const bcrypt = require('bcrypt');

//Creacion de plantilla de usuarios y cada atributo sera una columna

const usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks:{
        beforeCreate: async function(Usuario){
            const salt = await bcrypt.genSalt(10);
            Usuario.password = await bcrypt.hash(Usuario.password, salt);
        }
    }
});

module.exports = usuario;