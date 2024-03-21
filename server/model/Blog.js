const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
  {
    username: { type: String, required: false },
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: false },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
