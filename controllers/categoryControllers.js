const mongoose = require("mongoose");
const categoryModel = require("../models/categoryModel");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({}).sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get featured categories
const getFeaturedCategories = async (req, res) => {
  try {
    const featuredCategories = await categoryModel
      .find({ isFeatured: true })
      .sort({ createdAt: -1 });

    res.status(200).json(featuredCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCategories, getFeaturedCategories };
