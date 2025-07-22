const { body } = require("express-validator");

exports.roleValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama role wajib diisi")
    .isString()
    .withMessage("Nama role harus berupa string")
    .isLength({ min: 3 })
    .withMessage("Nama role minimal 3 karakter"),
];
