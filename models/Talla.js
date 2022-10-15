import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Talla = db.define('tallas', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Talla;