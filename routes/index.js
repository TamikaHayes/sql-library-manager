/**
 * Treehouse FSJS Techdegree
 * Project 8 - SQL Library Manager
 * Tamika Hayes
 * June 3, 2021
 * routes/books.js
 */


const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect("/books")
});


module.exports = router;
