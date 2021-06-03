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

/* GET books listing -- complete library collection. */
router.get('/', asyncHandler(async(req, res) => {
  const books = await Book.findAll();
  res.render("books/index", { books, title: "Samwell Library" });
}));


/* "Create a new book" -- data entry form for users to add newly acquired books. */
router.get('/new', (req, res) => {
  res.render("books/new-book", { book: {}, title: "New Book"});
});

/* POST newly created book entries to database. */
router.post('/', asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.redirect("/books/" + book.id);

  // let book;
  // try {
  //   book = await Book.create(req.body);
  //   res.redirect("/books/" + book.id);
  // } catch (error) {
  //   if(error.name === "SequelizeValidationError") {
  //     book = await Book.build(req.body);
  //     res.render("books/new-book", { book, errors: error.errors, title: "New Book" })
  //   } else {
  //     throw error;
  //   }  
  // }
}));

/* GET individual book. */
router.get("/:id", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.render("books/update-book", { book, title: book.title });

  // const book = await Book.findByPk(req.params.id);
  // if(book) {
  //   res.render("books/update-book", { book, title: book.title });  
  // } else {
  //   res.sendStatus(404);
  // }
})); 

module.exports = router;