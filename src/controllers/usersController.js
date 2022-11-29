const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

module.exports = {
    users: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        res.render(path.resolve(__dirname, '../views/usuarios/users'), { users });
    },
    login: (req, res) => {
        res.render(path.resolve(__dirname, '../views/usuarios/login'));
    },
    register: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        res.render(path.resolve(__dirname, '../views/usuarios/register'), { users });
    },
    save: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let ultimoUsers = users.pop();
        users.push(ultimoUsers);
        let nuevoUsers = {
            id: parseInt(ultimoUsers.id + 1),
            nombre: req.body.nombre,
            email: req.body.email,
            password:  bcrypt.hashSync(req.body.password, 10),
            cellphone: req.body.cellphone,
            direccion: req.body.direccion,
            imagen: req.file.filename
        }
        users.push(nuevoUsers);
        let nuevoUsersGuardar = JSON.stringify(users, null, 2) //aca se guarda esa informacion de una manera organizada con el null y 2
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), nuevoUsersGuardar); //writeFileSync me permite guardar el archvio
        res.redirect('/users');
    },
    ver: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        let miUsers;
        users.forEach(user => {
            if (user.id == req.params.id) {
                miUsers = user;
            }
        });
        res.render(path.resolve(__dirname, '../views/usuarios/ver'), { miUsers })
    },
    edit: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        const usersId = req.params.id;
        let userEditar = users.find(user => user.id == usersId);
        res.render(path.resolve(__dirname, '../views/usuarios/registerEdit'), { userEditar });
    },
    update: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
        //si la info es igual haga lo del if
        let usersUpdate = users.map(user => {
            if (user.id == req.body.id) {
                return user = req.body;
            }
            return user;
        })
        let userActualizar = JSON.stringify(usersUpdate, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), userActualizar);
        res.redirect('/users');
    },
    delete: (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
        const userDelete = req.params.id;
        const userFinal = users.filter(user => user.id != userDelete);
        let usersGuardar = JSON.stringify(userFinal, null, 2)
        fs.writeFileSync(path.resolve(__dirname, '../database/users.json'), usersGuardar); //writeFileSync me permite guardar el archvio
        res.redirect('/users');
    },

    loginUser: (req, res) => {
        console.log("esroy en login")
        let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));

        let userEmail = req.body.email;

        let userPassword = req.body.password;

        const userToLogin = users.filter(user => user.email == userEmail);
        console.log(userToLogin);
        if (userToLogin) {
            if (bcrypt.compareSync(userPassword, userToLogin.password)) {
                console.log(userToLogin);
            }else{
                console.log("no estoy logueado")
            }
        }
    }
}


    // PARTE DE EXPRESS VALIDATOR NO FUNCIONAL
    // store: (req, res) => {
    //     let errors = validationResult(req);
    //     if(!errors.isEmpty()){
    //         return res.render('/register', {errors:errors.mapped()})
    //     }
    //     req.session.nombre = req.body.nombre;
    //     req.session.email = req.body.email;
    //     req.session.password = req.body.password;
    //     req.session.cellphone = req.body.cellphone;
    //     req.session.direccion = req.body.direccion;
    //     res.redirect('/');
    // }