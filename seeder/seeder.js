import { exit } from 'node:process'
import { Categoria, Marca, usuario, Talla } from '../models/index.js'
import categorias from './categorias.js'
import marcas from './marcas.js'
import tallas from './tallas.js'
import Usuarios from './usuario.js'
import db from "../config/db.js";


const importarDatos = async () => {
    try {
        // autenticar en la base de datos
        await db.authenticate();

        // Generar las columnas
        await db.sync();

        // Insertar los datos
        await Promise.all([
            Marca.bulkCreate(marcas),
            Categoria.bulkCreate(categorias),
            usuario.bulkCreate(Usuarios),
            Talla.bulkCreate(tallas)
        ])

        console.log('Datos importados correctamente');
        exit();

    } catch (error) {
        console.log(error);
        exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        // await Promise.all([
        //     Precio.destroy({where: {}, truncate: true}),
        //     Categoria.destroy({where: {}, truncate: true})
        // ])
        await db.sync({force: true})
        console.log('Datos eliminados correctamente');
        exit();
    } catch{
        console.log(error);
        exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}