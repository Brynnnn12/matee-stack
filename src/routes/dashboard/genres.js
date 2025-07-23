const express = require("express");
const router = express.Router();
const genreController = require("../../controllers/genreController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const { genreValidation } = require("../../validation/genreValidation");

router.get("/", protect, authorize("Admin"), genreController.index);
// ...existing code...
router.get("/create", protect, authorize("Admin"), genreController.create);
router.get("/:slug/edit", protect, authorize("Admin"), genreController.edit);
router.post(
  "/",
  protect,
  authorize("Admin"),
  genreValidation,
  genreController.store
);
router.put(
  "/:slug",
  protect,
  authorize("Admin"),
  genreValidation,
  genreController.update
);
router.delete("/:slug", protect, authorize("Admin"), genreController.destroy);

module.exports = router;
