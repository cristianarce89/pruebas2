import { Producto, Talla, Marca, Categoria } from "../../models/index.js";
import { validationResult } from "express-validator";

const admin = async (req, res) => {
    const productos = await Producto.findAll({
        include: [
            {model: Categoria, as: 'categoria'}, // Aqui estamos cruzando la informacion para poder obtener el nombre de el id que se esta relacionando en la tabla de propiedades
            {model: Talla, as: "talla"},
            {model: Marca, as: "marca"},
        ]
    })

    res.render('admin/adminPanel', {
        productos,
    })
};

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

    res.redirect('adminPanel');

};

const editar = async (req, res) => {

    const { id } = req.params
    
    // Validar que el producto exista

    const producto = await Producto.findByPk(id)

    if(!producto){
        return res.redirect('/adminPanel')
    }

    // Consultar producto
    const [categorias, tallas, marcas ] = await Promise.all([
        Categoria.findAll(),
        Talla.findAll(),
        Marca.findAll()
    ]);

    return res.render('productos/productEdit', {
        categorias,
        tallas,
        marcas,
        datos: producto
    });

}

const guardarCambios = async (req, res) => {

    const { id } = req.params
    // Validar que el producto exista

    const producto = await Producto.findByPk(id)

    if(!producto){
        return res.redirect('/adminPanel')
    }

    // Reescribir el objeto y guardarlo

    try {
        const { titulo, descripcion, precio, descuento, categoria: categoriaId, tallas: tallaId, marcas: marcaId } = req.body

        producto.set({
            titulo,
            descripcion,
            precio,
            descuento,
            categoriaId,
            tallaId,
            marcaId
        })


        await producto.save();

        res.redirect('/adminPanel')

    } catch (error) {
        console.log(error);
    }
}

const eliminar = async (req, res) => {

    // Nunca confies en los usuarios, siempre realiza los validaciones y asi te ahorras problemas jaja
    const { id } = req.params
    // Validar que el producto exista

    const producto = await Producto.findByPk(id)

    if(!producto){
        return res.redirect('/adminPanel')
    }

    // Eliminar la imagen que se aloja en la carpeta public - uploads
    // await unlink(`public/uploads/${producto.imagen}`)

    // Eliminar el producto
    await producto.destroy()
    res.redirect('/adminPanel')
}

export {
    admin,
    crear,
    guardar,
    editar,
    guardarCambios,
    eliminar
}