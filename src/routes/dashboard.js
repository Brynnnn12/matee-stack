const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, (req, res) => {
  res.render("dashboard/pages/index", {
    title: "Dashboard",
    currentPage: "dashboard",
    layout: "layouts/dashboard",
  });
});

module.exports = router;
