const { body } = require("express-validator");
const validator = require("validator");

const characterValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama karakter wajib diisi")
    .isString()
    .withMessage("Nama karakter harus berupa string")
    .isLength({ min: 3 })
    .withMessage("Nama karakter minimal 3 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("description")
    .optional()
    .isString()
    .withMessage("Deskripsi harus berupa string")
    .isLength({ min: 10 })
    .withMessage("Deskripsi minimal 10 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("game_id")
    .notEmpty()
    .withMessage("Game wajib dipilih")
    .isUUID()
    .withMessage("Game tidak valid"),
];
module.exports = { characterValidation };
