import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Marca = db.define('marcas', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Marca;