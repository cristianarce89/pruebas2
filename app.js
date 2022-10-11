const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');
const db = require('./config/db.js');
const csrf = require('csurf');

var indexRouter = require('./src/routes/index.js');
// var usersRouter = require('./src/routes/users.js');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
//Ruta del registro
app.use('/', usuarioRoutes);
//Habilitar lectura de datos del formulario
app.use( express.urlencoded({ extended:true }));
//conexion a la base de datos
try {
  db.authenticate();
  db.sync();
  console.log('Conexion correcta a la base de datos');
} catch (error){
  console.log(error);
}
//---------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index');
});

module.exports = app;
