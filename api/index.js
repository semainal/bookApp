const express =  require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const bookRoute = require("./routes/books")
const multer = require("multer")
const path = require("path");




dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use("/images",express.static(path.join(__dirname,"/images")))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, 
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
    .then(console.log("connected to MongoDB!"))
    .catch((err) => console.log(err));


    
    const storage = multer.diskStorage({
      destination:(req,file, cb) =>{
        cb(null, "images");
      }, 
      filename:(req,file,cb) =>{
        cb(null, req.body.name);
      },
    });

    const upload = multer({storage:storage});
    app.post("/api/upload", upload.single("file"), (req, res) => {
      res.status(200).json("File has been uploaded!")
    })
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/posts", postRoute);
    app.use("/api/books", bookRoute);

app.listen("5000", ()=> {
    console.log("Backend is running!!!")
});
