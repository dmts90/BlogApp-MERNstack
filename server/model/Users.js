const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullname: { type: String, required: false },
    username: { type: String, required: false },
    email: { type: String, required: false },
    birthday: { type: Date, required: false },
    password: { type: String, required: false },
    image: { type: String },
    aboutme: { type: String, required: false },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
    instagram: { type: String, required: false },
    threads: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
