import { Producto, Talla, Marca, Categoria } from "../../models/index.js";
import { validationResult } from "express-validator";

const admin = (req, res) =>  res.render('admin/adminPanel');

// Formulario para crear nuevos productos
const crear = async (req, res) => {
    // consultar a la base de datos .. categorias
    const [categorias, marcas, tallas] = await Promise.all([
        Categoria.findAll(),
        Talla.findAll(),
        Marca.findAll()
    ]);
    
    res.render('productos/productCreate', {
        categorias,
        marcas,
        tallas
    });
};


const guardar = async (req, res) => {
    // Validacion
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categorias, tallas, marcas] = await Promise.all([
            Categoria.findAll(),
            tallas.findAll(),
            marcas.findAll()
        ]);

        return res.render('productos/productCreate', {
            categorias,
            marcas,
            tallas,
            errores: resultado.array(),
            datos: req.body
        });
    };

    // Crear un registro
    const { titulo, precio, descuento, descripcion, marcas: marcasId, tallas: tallasId, categoria: categoriaId } = req.body


    try {
        const productoGuardado = await Producto.create({
            titulo,
            descripcion,
            precio,
            descuento,
            imagen: ''
        })

        } catch (error) {
        console.log(error);
    }

};

export {
    admin,
    crear,
    guardar
}