const { body } = require("express-validator");
const validator = require("validator");

const gameValidation = [
  body("name")
    .notEmpty()
    .withMessage("Judul wajib diisi")
    .isString()
    .withMessage("Judul harus berupa string")
    .isLength({ max: 30 })
    .withMessage("Judul maksimal 30 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("description")
    .optional()
    .isString()
    .withMessage("Deskripsi harus berupa string")
    .isLength({ max: 500 })
    .withMessage("Deskripsi maksimal 500 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("release_date")
    .optional()
    .isDate()
    .withMessage("Tanggal rilis harus berupa tanggal valid"),
  body("developer")
    .optional()
    .isString()
    .withMessage("Developer harus berupa string")
    .isLength({ max: 100 })
    .withMessage("Developer maksimal 100 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("genre_id")
    .notEmpty()
    .withMessage("Genre wajib dipilih")
    .isUUID()
    .withMessage("Genre tidak valid"),
];

module.exports = { gameValidation };
