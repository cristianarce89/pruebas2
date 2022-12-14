import express from 'express';
import path from 'path';
import usuarioRoutes from './src/routes/usuarioRouter.js';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import {fileURLToPath} from 'url';
import productRoutes from './src/routes/productosRoutes.js'

// Actualizando el dirname para trabajar con modulos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear el app
const app = express();

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}));

// Habilitar cookie parser
app.use(cookieParser());

// Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.log('Conexion correcta a la base datos');
} catch (error) {
    console.log(error);
};

// Carpeta public es el contenedor de archivos estaticos
app.use(express.static('public'));

// Habilitar vista con modulos y ejs
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/views', usuarioRoutes)
app.use('/', usuarioRoutes)

// Productos routes
app.use('/', productRoutes)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`));

