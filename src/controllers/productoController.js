import { Producto, Talla, Marca, Categoria } from "../../models/index.js";
import { validationResult } from "express-validator";

const admin = (req, res) => { res.render('productos/admin') };

// Formulario para crear nuevos productos
const crear = async (req, res) => {
    // consultar a la base de datos por los precios y categorias
    const [categorias, marcas, tallas] = await Promise.all([
        Categoria.findAll(),
        Talla.findAll(),
        Marca.findAll()
    ]);

    res.render('productos/crear', {
        categorias,
        marcas,
        tallas,
        datos: {}
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

        return res.render('productos/crear', {
            categorias,
            marcas,
            tallas,
            errores: resultado.array(),
            datos: req.body
        });
    };

    // Crear un registro
    const { titulo, descripcion, marcas: marcasId, tallas: tallasId, categoria: categoriaId } = req.body

    const { id: usuarioId } = req.Usuario 

    try {
            const productoGuardado = await Propiedad.create({
            titulo,
            descripcion, 
            marcasId,
            tallasId,
            categoriaId,
            usuarioId,
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
};