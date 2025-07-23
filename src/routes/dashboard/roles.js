const express = require("express");
const router = express.Router();
const roleController = require("../../controllers/roleController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const { roleValidation } = require("../../validation/roleValidation");

router.get("/", protect, authorize("Admin"), roleController.index);
router.get("/create", protect, authorize("Admin"), roleController.create);
router.post(
  "/",
  protect,
  authorize("Admin"),
  roleValidation,
  roleController.store
);
router.get("/:id/edit", protect, authorize("Admin"), roleController.edit);
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  roleValidation,
  roleController.update
);
router.delete("/:id", protect, authorize("Admin"), roleController.destroy);

module.exports = router;
