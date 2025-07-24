const express = require("express");
const router = express.Router();
const skillController = require("../../controllers/skillController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const { skillValidation } = require("../../validation/skillValidation");

// List skills
router.get("/", protect, authorize("Admin"), skillController.index);

// Create (GET)
router.get("/create", protect, authorize("Admin"), skillController.create);

// Store (POST)
router.post(
  "/create",
  protect,
  authorize("Admin"),
  skillValidation,
  skillController.store
);

// Edit (GET)
router.get("/:id/edit", protect, authorize("Admin"), skillController.edit);

// Update (PUT)
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  skillValidation,
  skillController.update
);

// Delete skill
router.delete("/:id", protect, authorize("Admin"), skillController.destroy);

module.exports = router;
