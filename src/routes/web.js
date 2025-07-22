const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const roleController = require("../controllers/roleController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { roleValidation } = require("../validation/roleValidation");

// Halaman utama
router.get("/", (req, res) => {
  const user = req.session.user ? req.session.user : null;
  const message = req.flash("message");
  res.render("home", {
    title: "Home",
    user,
    message,
    currentPage: "home",
  });
});
router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Register",
    errors: req.flash("errors"),
    old: req.flash("old"),
    currentPage: "register",
  });
});
router.post("/register", authController.register);

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    errors: req.flash("errors"),
    old: req.flash("old"),
    currentPage: "login",
  });
});
router.post("/login", authController.login);

// Logout
router.get("/logout", protect, authController.logout);

// Example protected route dashboard roles
router.get(
  "/dashboard/roles",
  protect,
  authorize("Admin"),
  roleController.index
);
// Tambah role
router.post(
  "/dashboard/roles",
  protect,
  authorize("Admin"),
  roleValidation,
  roleController.store
);
// Hapus role
router.post(
  "/dashboard/roles/:id/delete",
  protect,
  authorize("Admin"),
  roleController.destroy
);
module.exports = router;
