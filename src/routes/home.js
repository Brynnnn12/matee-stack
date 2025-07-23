const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const user = req.session.user || null;
  const message = req.flash("message");
  res.render("home", {
    title: "Home",
    user,
    message,
    currentPage: "home",
  });
});

module.exports = router;
