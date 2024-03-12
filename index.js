require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3500;
const categoryRoutes = require("./routes/categoryRoutes");
const postRoutes = require("./routes/postRoutes");
// const Post = require("./models/postModel");
// const posts = require("./posts.json");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/posts", postRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "explrly",
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Port is ${PORT}`);
    });
  })
  // .then(() => {
  //   Post.create(posts);
  // })
  .catch((err) => {
    console.log(err);
  });
