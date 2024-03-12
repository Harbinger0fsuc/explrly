const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
    },
    image: {
      type: String,
      required: [true, "Category's image is required"],
    },
    isFeatured: {
      type: Boolean,
      required: [true, "isFeatured field is required"],
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
