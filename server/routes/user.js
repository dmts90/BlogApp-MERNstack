const express = require("express");
const router = express.Router();
const User = require("../model/Users");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = req.body;
    const newUser = await User.findByIdAndUpdate(
      req.params.userId,
      updatedUser,
      { news: true }
    );
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json("Server Status");
  }
});
module.exports = router;
