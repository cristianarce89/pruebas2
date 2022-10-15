import Producto from "./Producto.js";
import Talla from "./Talla.js";
import Marca from "./Marcas.js";
import Categoria from "./Categoria.js";
import usuario from "./usuario.js"      

//Marca.hasOne(Producto) Con este metodo creamos la llave foranea que nos va a relacionar el Producto con la marca y el codigo se interpreta de derecha a izquierda

// este meotodo es el mismo que de arriba solo cambia la interpretacion y la sintaxis
Producto.belongsTo(Talla); 
Producto.belongsTo(Marca);
Producto.belongsTo(Categoria); 
Producto.belongsTo(usuario);  

export {
    Producto,
    Talla,
    Categoria,
    Marca,
    usuario
}