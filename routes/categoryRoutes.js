const express = require("express");
const router = express.Router();

const {
  getCategories,
  getFeaturedCategories,
} = require("../controllers/categoryControllers");

router.get("/", getCategories);
router.get("/featured", getFeaturedCategories);

module.exports = router;
