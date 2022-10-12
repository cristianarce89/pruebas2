import { Sequelize } from "sequelize"; // Object Relational Mapping ORM
import dotenv from 'dotenv'; // Variables de entorno para proteger la informacion del ingreso a la base de datos
dotenv.config({path: '.env'}); // De esta manera configuramos el dotenv para poderlo usar.

// La manera de acceder a las variables contenidas en el archivo .env es con process.env.NOMBREDELAVARIABLE

// El port o puerto es en este caso el que viene por default en el localhost de mysql
//Importante tener clara la estructura de la creacion de la base de datos
// Despues de esto nos debemos ir al app.js que esta contenido en el global y hacer la respectiva coneccion con la base de datos (esta almacenada en el try)
// Luego pasaremos a crear la estructura de las tablas contenidas en la base de datos y para eso crearemos la carpeta models y en ella estara el archivo que contendra esa base de datos con su configuracion.
// La logica para darle funcionalidad a los formularios esta contenida en la carpeta controllers y esta debe contenerse con el nombre del formulario al cual se quiera agregar esta funcionaalidad valga la redundancia

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default db;