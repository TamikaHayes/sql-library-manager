const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  if (err) {
    console.log('Fiddlesticks! Something went wrong.');
  }
  //handle errors caught by route handlers
  if (err.status === 404) {
      res.status(404).render('page-not-found', { err });
  } else {
      const err = new Error();
      err.status = 500;
      err.message = err.message || `Oh snap! Looks like something went wrong on the server. Status: ${err.status}`;
      console.log(err.status, err);
      console.log(err.message, err);
      res.status(err.status || 500).render('error', { err });
  }

  // render the error page
  //res.status(err.status || 500); 
  //res.render('error', {err});
});

// async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

module.exports = app;
