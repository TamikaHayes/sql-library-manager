/**
 * Treehouse FSJS Techdegree
 * Project 8 - SQL Library Manager
 * Tamika Hayes
 * June 3, 2021
 * app.js
 */

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const routes = require('./routes/index');
const books = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/books', books);

/* ERROR HANDLERS */

// 404 handler to catch undefined or nonexistent route requests, and forward to error handler
app.use(function(req, res, next) {
  const err = new Error();
  err.status = 404;
  err.message = err.message || "Our apologies! We couldn't find the page you were looking for.";
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  
  if (err.status === 404) {
      res.status(404).render('books/page-not-found', { err });
      err.message = err.message || `It looks like that page doesn't exist. Here's the error status code: ${err.status}`;
  } else {
      const err = new Error();
      err.status = 500;
      err.message = err.message || `Sorry! There was an unexpected error on the server. Here's the error status code: ${err.status}`;
      console.log(err.status, err);
      console.log(err.message, err);
      console.log("GLOBAL error handler called");
      res.status(err.status || 500).render('books/error', { err });
  }

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
