const express = require("express");
const router = express.Router();
const gameController = require("../../controllers/gameController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const { uploadGameImage } = require("../../utils/image");
const { gameValidation } = require("../../validation/gameValidation");
const { csrfUpload } = require("../../utils/csurf");

// List games
router.get("/", protect, authorize("Admin"), gameController.index);

// Create (GET)
router.get(
  "/create",
  protect,
  authorize("Admin"),
  csrfUpload,
  gameController.create
);
// Store (POST)
router.post(
  "/",
  protect,
  authorize("Admin"),
  uploadGameImage,
  csrfUpload,
  gameValidation,
  gameController.store
);
// Edit (GET)
router.get(
  "/:slug/edit",
  protect,
  authorize("Admin"),
  csrfUpload,
  gameController.edit
);
// Update (PUT)
router.put(
  "/:slug",
  protect,
  authorize("Admin"),
  uploadGameImage,
  csrfUpload,
  gameValidation,
  gameController.update
);

// Delete game (bisa lewat csrfProtection jika pakai form POST/DELETE di EJS)
router.delete("/:slug", protect, authorize("Admin"), gameController.destroy);

// Show game detail
router.get("/:slug", protect, authorize("Admin"), gameController.show);

module.exports = router;
