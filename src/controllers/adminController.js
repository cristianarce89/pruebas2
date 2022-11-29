const path = require('path');
const fs = require('fs');

const adminController = {
    admin: (req,res) => {
        //llamo el objeto json y lo paso de un string a un objeto literal
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json'))); 
        res.render(path.resolve(__dirname, '../views/admin/administrador'), {productos});
    },
    productCreate: (req,res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json'))); 
        res.render(path.resolve(__dirname, '../views/productos/productCreate'), {productos});
    },
    save: (req,res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let ultimoProducto = productos.pop();
        productos.push(ultimoProducto);
        console.log(req.body);
        console.log(req.file);
        let nuevoProducto = {
            id: parseInt(ultimoProducto.id + 1),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precioAnt: req.body.precioAnt,
            precio: req.body.precio,
            descuento: req.body.descuento,
            ranking: req.body.ranking,
            color: req.body.color,
            categoria: req.body.categoria,
            talla: req.body.talla,
            marca: req.body.marca,
            imagen: req.file.filename
        }
        productos.push(nuevoProducto);
        let nuevoProductoGuardar = JSON.stringify(productos,null,2) //aca se guarda esa informacion de una manera organizada con el null y 2
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), nuevoProductoGuardar); //writeFileSync me permite guardar el archvio
        res.redirect('/admin');
    },
    ver: (req,res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        let miProducto;
        productos.forEach(producto =>{
            if(producto.id == req.params.id){
                miProducto = producto;
            }
        });
        res.render(path.resolve(__dirname, '../views/productos/productDetail'), {miProducto})
    },
    edit: (req,res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const productosId = req.params.id;
        let productoEditar = productos.find(producto => producto.id == productosId);
        res.render (path.resolve(__dirname, '../views/productos/productEdit'), {productoEditar});
    },
    update: (req,res) => {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        //si la info es igual haga lo del if
        let productosUpdate = productos.map(producto => {
            if(producto.id == req.body.id){
                return producto = req.body;
            }
            return producto;
        })
        let productoActualizar = JSON.stringify(productosUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), productoActualizar);
        res.redirect('/admin')
    },
    delete: (req,res) =>{
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/productos.json')));
        const productoDelete = req.params.id;
        const productosFinal = productos.filter(producto => producto.id != productoDelete);
        let productosGuardar = JSON.stringify(productosFinal,null,2)
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), productosGuardar); //writeFileSync me permite guardar el archvio
        res.redirect('/admin');
    }
}

module.exports = adminController;