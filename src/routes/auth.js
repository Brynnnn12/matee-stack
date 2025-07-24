const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/register")
  .get((req, res) => {
    res.render("auth/register", {
      title: "Register",
      errors: req.flash("errors"),
      old: req.flash("old"),
      currentPage: "register",
    });
  })
  .post(authController.register);

router
  .route("/login")
  .get((req, res) => {
    res.render("auth/login", {
      title: "Login",
      errors: req.flash("errors"),
      messages: req.flash("message"),
      currentPage: "login",

      old: req.flash("old"),
    });
  })
  .post(authController.login);

router.post("/logout", protect, authController.logout);
module.exports = router;
