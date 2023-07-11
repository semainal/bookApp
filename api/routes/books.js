const router = require("express").Router();

const Book = require("../models/Book");



//CREATE NEW BOOK
router.post("/", async (req,res) => {
  const newBook = new Book(req.body);
  try{
    const savedBook = await newBook.save();
    res.status(200).json(savedBook);


  }catch(err){
    res.status(500).json(err);
  }
   
});

//UPDATE BOOK

router.put("/:id", async (req,res) => {
    try{
        const book =await Book.findById(req.params.id);
        if(book.username === req.body.username){
            try{
                const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new: true });
                res.status(200).json(updatedBook);
            } catch(err){
                res.status(500).json(err);
               
            }
        } 

    } catch(err){
        res.status(500).json(err);
    }


});



// DELETE BOOK
router.delete("/:id", async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(book.username === req.body.username){
            try{
                const deletedBook = await Book.findByIdAndDelete(req.params.id);
                res.status(200).json(deletedBook);
                } catch(err){
                    res.status(500).json(err);
                    }
                    } 
} catch(err){
    res.status(500).json(err);
    }
    });





//GET POST
router.get("/:id", async (req,res) => {
  try{
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
    } catch(err){
        res.status(500).json(err);
        }
            });

//GET ALL POSTS
router.get("/", async (req,res) => {
    const username = req.query.user;
    const bookName = req.query.book;
    try{
        if(username){
            book = await Book.find({username})
        } else if(bookName) {
            books = await Book.find({bookName: {
                $in:[bookName]
            }});
        } else {
            books = await Book.find();
        }
        res.status(200).json(books);
      
        } catch(err){
            res.status(500).json(err);
            }
            });


// GET USER'S Books
router.get("/user/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const books = await Book.find({ userId: user._id });
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router