import bcrypt from 'bcrypt'

const Usuarios = [
    {
        nombre: 'admin',
        email: 'admin@admin.com',
        confirmado: 1,
        password: bcrypt.hashSync('1234567', 10),
        cellphone: 1321312312,
        direccion: 'saadasdasd'
    }
];

export default Usuarios;