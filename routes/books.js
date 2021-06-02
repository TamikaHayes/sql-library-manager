const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async (req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      //Forward error to the global error handler
      next(error);
      //res.status(500).send(error);
    }
  }
}

/* GET books listing. */
router.get('/', asyncHandler(async(req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render("index", { books, title: "Samwell Library" });
}));

module.exports = router;
