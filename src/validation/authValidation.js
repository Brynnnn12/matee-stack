const { body } = require("express-validator");
const validator = require("validator");

exports.registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .customSanitizer((value) => validator.escape(value)),
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Email tidak valid")
    .customSanitizer((value) => validator.escape(value)),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .customSanitizer((value) => validator.escape(value)),
  body("avatar")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Avatar harus berupa string"),
];

exports.loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Email tidak valid")
    .customSanitizer((value) => validator.escape(value)),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    .customSanitizer((value) => validator.escape(value)),
];
