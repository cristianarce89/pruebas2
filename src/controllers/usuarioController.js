import { check, validationResult} from 'express-validator'
import usuario from "../../models/usuario.js"
import { generarId } from '../../helpers/tokens.js'
import { emailRegistro, emailRecuperarPassword } from '../../helpers/emails.js'

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

export {
    registrar
}


