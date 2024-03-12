const mongoose = require("mongoose");
const postModel = require("../models/postModel");
const readingTime = require("reading-time");

// Get all posts
const getPosts = async (req, res) => {
  try {
    const { category, sortBy } = req.query;
    const pageSize = parseInt(req.query.pageSize || "3");
    const page = parseInt(req.query.page || "0");
    const queryObject = {};
    const sortObj = {};

    if (category && category === "all") {
      delete queryObject.categories;
    } else {
      queryObject.categories = {
        $regex: new RegExp(category),
        $options: "i",
      };
    }

    if (sortBy === "asc") {
      sortObj.createdAt = -1;
    } else {
      sortObj.createdAt = 1;
    }

    const total = await postModel.countDocuments(queryObject);

    const posts = await postModel
      .find(queryObject)
      .sort(sortObj)
      .limit(pageSize)
      .skip(pageSize * page);

    res.status(200).json({ posts, totalPages: Math.ceil(total / pageSize) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get posts by search
const getPostsBySearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res
        .status(404)
        .json({ message: "Please enter some value to search for an article" });
    }

    const postsBySearch = await postModel
      .find({
        $or: [
          { title: { $regex: new RegExp(q), $options: "i" } },
          { excerpt: { $regex: new RegExp(q), $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(postsBySearch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get recent posts
const getRecentPosts = async (req, res) => {
  try {
    const recentPosts = await postModel
      .find({})
      .sort({ $natural: -1 })
      .limit(7);

    res.status(200).json(recentPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a featured post
const getFeaturedPost = async (req, res) => {
  try {
    const featuredPost = await postModel.find({ isFeatured: true });

    const timeToRead = readingTime(featuredPost[0].content);

    res.status(200).json({ ...featuredPost, timeToRead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single post
const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: "No such an article" });
    }

    const post = await postModel.findById(id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get random posts
const getRandomPosts = async (req, res) => {
  try {
    const randomPosts = await postModel.aggregate().sample(3);

    if (!randomPosts) {
      return res.status(404).json({ message: "There are no posts" });
    }

    res.status(200).json(randomPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPosts,
  getPostsBySearch,
  getRecentPosts,
  getFeaturedPost,
  getSinglePost,
  getRandomPosts,
};
