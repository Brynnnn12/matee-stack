const express = require("express");
const router = express.Router();
const skillController = require("../../controllers/skillController");
const { protect, authorize } = require("../../middleware/authMiddleware");
const { skillValidation } = require("../../validation/skillValidation");

router.get("/", protect, authorize("Admin"), skillController.index);

router.get("/create", protect, authorize("Admin"), skillController.create);

router.post(
  "/create",
  protect,
  authorize("Admin"),
  skillValidation,
  skillController.store
);

router.get("/:id/edit", protect, authorize("Admin"), skillController.edit);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  skillValidation,
  skillController.update
);

router.delete("/:id", protect, authorize("Admin"), skillController.destroy);

module.exports = router;
