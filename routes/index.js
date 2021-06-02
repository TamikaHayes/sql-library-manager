const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect("/books")
});


// router.get('/', asyncHandler(async (req, res) => {
//   const books = await Book.findAll();
//   console.log(books);
//   //throw new Error;
//   res.json(books);
  
//   //res.render('index', { '/books', title: 'Express' });
// }));


/*GET generated error route - create and throw 500 error*/
// router.get('/error', (req, res, next) => {
  
//   const err = new Error();
//   err.status = 500;
//   err.message = `Uh-oh. Looks like trouble with the server. Status: ${err.status}`;
//   //console.log(err.status);
//   //console.log(err.message);
//   throw err;
// });

// /* GET book pages dynamically, based on id property. */
// router.get('/books/:id', function(req, res, next) {
//    const bookId = req.params.id;
//    const books = books.find( ({ id }) => id === +bookId );
  
//    //check to see if requested book page exists
//    if (book) {
//      // if true, pass the book data to the 'index' pug template
//      res.render('index', { books });
//    } else {
//     const err = new Error();
//     err.status = 404;
//     err.message = `Looks like the page you requested doesn't exist. Status: ${err.status}`;
//     next(err);
    
//    }
// });



module.exports = router;
