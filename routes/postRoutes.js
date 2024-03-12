const express = require("express");
const router = express.Router();

const {
  getPosts,
  getPostsBySearch,
  getRecentPosts,
  getFeaturedPost,
  getSinglePost,
  getRandomPosts,
} = require("../controllers/postControllers");

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.get("/recent", getRecentPosts);
router.get("/featured", getFeaturedPost);
router.get("/random", getRandomPosts);
router.get("/:id", getSinglePost);

module.exports = router;
