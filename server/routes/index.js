const express = require("express");
const router = express.Router();

// Route dosyalarını buraya import edelim.
const blogRoute = require("./blog.js");
const userRoute = require("./user.js")

router.use("/blog", blogRoute);
router.use("/user", userRoute);

//export etmemiz gerekli!
module.exports = router;
