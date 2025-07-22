const { body } = require("express-validator");

exports.registerValidation = [
  body("name").notEmpty().withMessage("Nama wajib diisi"),
  body("email").notEmpty().withMessage("Email wajib diisi"),
  body("email").isEmail().withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("avatar")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Avatar harus berupa string"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Email tidak valid"),
  body("password").notEmpty().withMessage("Password wajib diisi"),
];
