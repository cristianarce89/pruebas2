const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require ('method-override');
const app = express();
const session = require('express-session');
// const userLogsMiddleware = require('./middlewares/userLogs');

// Indicar las vistas
app.set('views', path.join(__dirname, '/src/views'));
//Indicar cual es el motor de plantillas que estamos usando EJS
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'Proyecto intregrador Readni secreto', resave: false, saveUninitialized: true }));
// app.use(userLogsMiddleware);

//Para indicarle express la carpeta donde se encuentran los archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes PUT, DELETE, en nuestros formularios
app.use(methodOverride('_method'));



//REQUERIR LAS RUTAS
const indexRoutes = require('./src/routes/indexRoutes');
const productsRoutes = require('./src/routes/productsRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

//USAR LAS RUTAS
app.use('/', indexRoutes);
app.use(productsRoutes);
app.use(usersRoutes);
app.use(adminRoutes);


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
