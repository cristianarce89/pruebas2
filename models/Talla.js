import { DataTypes } from "sequelize";
import db from '../config/db.js'

const Talla = db.define('tallas', {
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Talla;