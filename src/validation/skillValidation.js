const { body } = require("express-validator");
const validator = require("validator");

const skillValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama skill wajib diisi")
    .isString()
    .withMessage("Nama skill harus berupa string")
    .isLength({ min: 3 })
    .withMessage("Nama skill minimal 3 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("description")
    .optional()
    .isString()
    .withMessage("Deskripsi harus berupa string")
    .isLength({ min: 10 })
    .withMessage("Deskripsi minimal 10 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("character_id")
    .notEmpty()
    .withMessage("Karakter wajib dipilih")
    .isUUID()
    .withMessage("Karakter tidak valid"),
];

module.exports = { skillValidation };
