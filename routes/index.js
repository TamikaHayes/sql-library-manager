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


/*GET generated error route - create and throw 500 error*/
router.get('/error', (req, res, next) => {
  
  const err = new Error();
  err.status = 500;
  err.message = `Uh-oh. Looks like trouble with the server. Status: ${err.status}`;
  console.log(err.status);
  console.log(err.message);
  //res.render('error', { err } );
  throw err;
});

/* GET project pages dynamically, based on id property. */
// router.get('/projects/:id', function(req, res, next) {
//   const projectId = req.params.id;
//   const project = projects.find( ({ id }) => id === +projectId );
  
//   //check to see if requested project page exists
//   if (project) {
//     // if true, pass the project data to the 'project' pug template
//     res.render('project', { project });
//   } else {
//     const err = new Error();
//     err.status = 404;
//     err.message = `Looks like the page you requested doesn't exist. Status: ${err.status}`;
//     next(err);
    
//   }
// });

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  console.log(books);
  throw new Error;
  //res.json(books);

  //res.render('index', { /books, title: 'Express' });
}));

module.exports = router;
