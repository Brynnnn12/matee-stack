const express = require("express");
const router = express.Router();
const characterController = require("../../controllers/characterController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const { uploadCharacterImage } = require("../../utils/image");
const { csrfUpload } = require("../../utils/csurf");
const { characterValidation } = require("../../validation/characterValidation");

// List characters
router.get("/", protect, authorize("Admin"), characterController.index);

// Create (GET)
router.get(
  "/create",
  protect,
  authorize("Admin"),
  csrfUpload,
  characterController.create
);
// Store (POST)
router.post(
  "/",
  protect,
  authorize("Admin"),
  uploadCharacterImage,
  csrfUpload,
  characterValidation,
  characterController.store
);
// Edit (GET)
router.get(
  "/:slug/edit",
  protect,
  authorize("Admin"),
  csrfUpload,
  characterController.edit
);
// Update (PUT)
router.put(
  "/:slug",
  protect,
  authorize("Admin"),
  uploadCharacterImage,
  csrfUpload,
  characterValidation,
  characterController.update
);

// Delete character (bisa lewat csrfProtection jika pakai form POST/DELETE di EJS)
router.delete(
  "/:slug",
  protect,
  authorize("Admin"),
  characterController.destroy
);

module.exports = router;
