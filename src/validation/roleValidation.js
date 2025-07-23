const { body } = require("express-validator");
const validator = require("validator");

exports.roleValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama role wajib diisi")
    .isString()
    .withMessage("Nama role harus berupa string")
    .isLength({ min: 3 })
    .withMessage("Nama role minimal 3 karakter")
    // Sanitasi input untuk menghindari XSS
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, ""); // Hapus tag HTML
    })
    // Validasi karakter yang diperbolehkan
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama role hanya boleh terdiri dari huruf dan spasi")
    // Escape karakter untuk menghindari XSS
    .customSanitizer((value) => {
      return validator.escape(value);
    }),
];
