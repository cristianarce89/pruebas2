import { check, validationResult} from 'express-validator'
import usuario from "../../models/usuario.js"
import bcrypt from 'bcrypt'
import { generarJWT, generarId } from '../../helpers/tokens.js'
import { emailRegistro, emailRecuperarPassword } from '../../helpers/emails.js'

const formularioLogin = (req, res) => {res.render('login')};

const autenticar = async (req, res) => {
    // Validacion
    await check('email').isEmail().withMessage('El email es obligatorio').run(req);
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req);

    let resultado = validationResult(req);

    //Verificar que el resultado no este vacio
    if(!resultado.isEmpty()){
        return res.render('login');
    };

    // Comprobar si el usuario existe

    const {email, password} = req.body;

    const Usuario = await usuario.findOne({where : {email}});
    if(!Usuario){
        return res.render('login');
    };

    // Comprobar si el usuario esta confirmado
    if(!Usuario.confirmado){
        return res.render('login');
    };
    // Revisar el password

    // if(!Usuario.verificarPassword(password)){
    //     return res.render('login');
    // };

     // Autenticar al usuario
     const token = generarJWT({id: Usuario.id, nombre: Usuario.nombre});
    

     // Almacenar en un cookie
 
     return res.cookie('_token', token, {
         httpOnly: true
         // secure: true,
         // sameSite: true
     }).redirect('/')
    
};

const formularioRegistro = (req, res) => {res.render('register')}

const registrar = async (req, res) => {
    // Validacion
    await check('nombre').notEmpty().run(req)
    await check('email').isEmail().run(req)
    await check('password').isLength({ min: 6 }).run(req)
    await check('repetir_password').equals(req.body.password).run(req)

    //Mostrar errores y hacer la validacion
    let resultado = validationResult(req)

    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('registro', {
                usuario: {
                    nombre: req.body.nombre,
                    email: req.body.email
                }
        })
    }

    // Extraer los datos
    const { nombre, email, password, cellphone, direccion  } = req.body
    // Verificar que el usuario no este duplicado
    const existeUsuario = await usuario.findOne( { where : { email } })
    if(existeUsuario) {
        return res.render('register', {
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email,
                cellphone: req.body.cellphone,
                direccion: req.body.direccion
            }
        })
    }

    // Almacenar un usuario
    const usuarioC = await usuario.create({
        nombre,
        email,
        password,
        cellphone,
        direccion,
        token: generarId()
    });

    // Envia email de confirmacion
    emailRegistro({
        nombre: usuarioC.nombre,
        email: usuarioC.email,
        token: usuarioC.token
    })

    // Mostrar mensaje de confirmacion !
    res.render('cuentaCreada')
}

const confirmar = async (req,res) => {
    const { token } = req.params;
    
    // Verificar si el token es valido
    const Usuario = await usuario.findOne({ where: {token}})

    if(!Usuario){
        return res.render('errorConfirmarCuenta')
    }

    // Confirmar la cuenta
    Usuario.token = null;
    Usuario.confirmado = true;
    await Usuario.save();

    res.render('confirmacionCorreo');

}

const formularioRecuperarPassword = (req, res) => {res.render('recuperar-password')}

const resetPassword = async (req, res) => {
    // Validacion
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    
    //Mostrar errores y hacer la validacion
    let resultado = validationResult(req)

    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        // Errores
        return res.render('recuperar-password', {
        })
    }

    // Buscar el usuario
    const { email } = req.body

    const Usuario = await usuario.findOne({where: {email}});
    if(!Usuario){
        return res.render('recuperar-password', {
        })
    }

    // Generar un token y enviar el email
    Usuario.token = generarId();
    await Usuario.save();

    // Enviar email
    emailRecuperarPassword({
        email: Usuario.email,
        nombre: Usuario.nombre,
        token: Usuario.token
    })

    // Renderizar un mensaje
    res.render('recuperarAcceso')
}

const comprobarToken = async (req,res) => {
    const { token } = req.params;

    const Usuario = await usuario.findOne({where: {token}})
    if(!Usuario){
        return res.render('confirmarCuenta')
    }

    // Mostrar un formulario para modificar el password
    res.render('reset-password')
}

const nuevoPassword = async (req,res) => {
    // Validar el password
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener por lo menos 6 caracteres').run(req)

    let resultado = validationResult(req)

    //Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        return res.render('reset-password')
    }

    const { token } = req.params
    const { password } = req.body;
    // Indentificar quien hace la peticion
    const Usuario = await usuario.findOne({where: {token}})

    // Hashear el nuevo password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash( password, salt);
    Usuario.token = null;

    await Usuario.save();

    res.render('confirmarCuenta')

}

export {
    formularioLogin,
    autenticar,
    formularioRegistro,
    registrar,
    confirmar,
    formularioRecuperarPassword,
    resetPassword,
    comprobarToken,
    nuevoPassword
}


