import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const { email, nombre, token} = datos;

      // Enviar el email

      await transport.sendMail({
        from: 'Readni.com',
        to: email,
        subject: 'confirma tu cuenta en Readni.com',
        text: 'confirma tu cuenta en Readni.com',
        html: ` <p>hola ${nombre}, confirma tu cuenta en Readni.com !!</p>
                <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/confirmar/${token} ">Confirmar cuenta</a></p>
                <p>Si tu no creaste la cuenta, puedes ignorar el mensaje</p>
                `
      })
}

const emailRecuperarPassword = async (datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const { email, nombre, token} = datos;

    // Enviar el email

    await transport.sendMail({
      from: 'Readni.com',
      to: email,
      subject: 'Reestablece el acceso en Readni.com',
      text: 'Reestablece el acceso en Readni.com',
      html: ` <p>hola ${nombre}, has solicitado reestablecer tu password en Readni.com !!</p>
              <p>Sigue el siguiente enlace para poder cambiar tu password: 
              <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/reset-password/${token} ">Restablecer Contraseña</a></p>
              <p>Si tu no solicitaste el cambio de contraseña, puedes ignorar el mensaje</p>
              `
    })
}

export { 
    emailRegistro,
    emailRecuperarPassword
}