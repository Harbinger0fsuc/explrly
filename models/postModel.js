const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Post's image is required"],
    },
    title: {
      type: String,
      required: [true, "Post's title is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Post's excerpt is required"],
    },
    content: {
      type: String,
      required: [true, "Post's content is required"],
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      required: [true, "Post's isFeatured field is required"],
      default: false,
    },
    author: {
      type: String,
      required: [true, "Post's author is required"],
    },
    authorImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
