const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");

router.get("/", protect, (req, res) => {
  res.render("profile/index", {
    title: "Profile",
    layout: "layouts/dashboard",
  });
});

module.exports = router;
