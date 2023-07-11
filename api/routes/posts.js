const router = require("express").Router();

const Post = require("../models/Post");



//CREATE NEW POST
router.post("/", async (req,res) => {
  const newPost = new Post(req.body);
  try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);


  }catch(err){
    res.status(500).json(err);
  }
   
});

//UPDATE POST

router.put("/:id", async (req,res) => {
    try{
        const post =await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new: true });
                res.status(200).json(updatedPost);
            } catch(err){
                res.status(500).json(err);
               
            }
        } else {
            res.status(401).json("You can update only your post!")
        }

    } catch(err){
        res.status(500).json(err);
    }


});



// DELETE POST
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const deletedPost = await Post.findByIdAndDelete(req.params.id);
                res.status(200).json(deletedPost);
                } catch(err){
                    res.status(500).json(err);
                    }
                    } else {
                        res.status(401).json("You can delete only your post!")
                        }
} catch(err){
    res.status(500).json(err);
    }
    });





//GET POST
router.get("/:id", async (req,res) => {
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
    } catch(err){
        res.status(500).json(err);
        }
            });

//GET ALL POSTS
router.get("/", async (req,res) => {
    const username = req.query.user;
    const postName = req.query.post;
    try{
        if(username){
            posts = await Post.find({username})
        } else if(postName) {
            posts = await Post.find({postName: {
                $in:[postName]
            }});
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
      
        } catch(err){
            res.status(500).json(err);
            }
            });


// GET USER'S POSTS
router.get("/user/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router