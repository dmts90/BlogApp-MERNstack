const express = require("express");
const Blog = require("../model/blog");
const User = require("../model/Users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
router.get("/:blogId", async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.blogId);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
router.post("/", async (req, res) => {
  try {
    const myData = req.body;
    const newBlog = new Blog(myData);
    await newBlog.save();
    res.status(200).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:blogId", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
router.put("/:blogId", async (req, res) => {
  try {
    const update = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      update,
      { news: true }
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});

//export etmemiz gerekli!
module.exports = router;
