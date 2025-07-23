const { body } = require("express-validator");
const validator = require("validator");

/** * Validasi input untuk genre
 */
exports.genreValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama genre harus diisi")
    .isLength({ min: 3 })
    .withMessage("Nama genre harus terdiri dari minimal 3 karakter")
    .customSanitizer((value) => validator.escape(value)),
];
