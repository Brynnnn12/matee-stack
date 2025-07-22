const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const roleController = require("../controllers/roleController");
const genreController = require("../controllers/genreController");

const {
  attachUser,
  protect,
  authorize,
} = require("../middleware/authMiddleware");
const { roleValidation } = require("../validation/roleValidation");
const { genreValidation } = require("../validation/genreValidation");

// ===================== HOME =====================
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

// ===================== AUTH =====================
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
      old: req.flash("old"),
      currentPage: "login",
    });
  })
  .post(authController.login);

router.get("/logout", protect, authController.logout);

// ===================== DASHBOARD =====================
router.get("/dashboard", attachUser, protect, (req, res) => {
  res.render("dashboard/pages/index", {
    title: "Dashboard",
    user: req.user,
    currentPage: "dashboard",
    layout: "layouts/dashboard",
  });
});

// ===================== PROFILE =====================
router.get("/dashboard/profiles", attachUser, protect, (req, res) => {
  res.render("profile/index", {
    user: req.user,
    title: "Profile",
    layout: "layouts/dashboard",
  });
});

// ===================== ROLES (Admin Only) =====================
router.get(
  "/dashboard/roles",
  attachUser,
  protect,
  authorize("Admin"),
  roleController.index
);

router.post(
  "/dashboard/roles",
  protect,
  authorize("Admin"),
  roleValidation,
  roleController.store
);

router.delete(
  "/dashboard/roles/:id",
  protect,
  authorize("Admin"),
  roleController.destroy
);

// ===================== GENRES (Admin Only) =====================
router.get(
  "/dashboard/genres",
  protect,
  authorize("Admin"),
  genreController.index
);

router.post(
  "/dashboard/genres",
  protect,
  authorize("Admin"),
  genreValidation,
  genreController.store
);

router.put(
  "/dashboard/genres/:slug",
  protect,
  authorize("Admin"),
  genreValidation,
  genreController.update
);

router.delete(
  "/dashboard/genres/:slug",
  protect,
  authorize("Admin"),
  genreController.destroy
);

module.exports = router;
