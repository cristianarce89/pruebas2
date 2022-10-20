import { Producto, Talla, Marca, Categoria } from "../../models/index.js";
import { validationResult } from "express-validator";

const admin = (req, res) =>  res.render('admin/adminPanel');

// Formulario para crear nuevos productos
const crear = async (req, res) => {
    // consultar a la base de datos .. categorias
    const [categorias, tallas, marcas ] = await Promise.all([
        Categoria.findAll(),
        Talla.findAll(),
        Marca.findAll()
    ]);

    res.render('productos/productCreate', {
        categorias,
        tallas,
        marcas,
        datos: {}
    });
};


const guardar = async (req, res) => {
    // Validacion

    let resultado = validationResult(req);

    if(!resultado.isEmpty()){

        const [categorias, tallas, marcas] = await Promise.all([
            categorias.findAll(),
            tallas.findAll(),
            marcas.findAll()
        ]);

        return res.render('productos/productCreate', {
            categorias,
            tallas,
            marcas,
            errores: resultado.array(),
            datos: req.body
        });
    };

    // Crear un registro
    const { titulo, descripcion, precio, descuento, categoria: categoriaId, tallas: tallaId, marcas: marcaId } = req.body

    try {
        const productoGuardado = await Producto.create({
            titulo,
            descripcion,
            precio,
            descuento,
            categoriaId,
            tallaId,
            marcaId,
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