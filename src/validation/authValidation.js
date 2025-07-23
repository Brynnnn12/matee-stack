const { body } = require("express-validator");
const validator = require("validator");

exports.registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
    // Sanitasi input untuk menghindari XSS
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, ""); // Hapus tag HTML
    })
    // Validasi karakter yang diperbolehkan
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama hanya boleh terdiri dari huruf dan spasi")
    // Escape karakter untuk menghindari XSS
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
    .notEmpty()
    .withMessage("Email wajib diisi")

    // Sanitasi input untuk menghindari XSS
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, ""); // Hapus tag HTML
    })
    // Escape karakter untuk menghindari XSS
    .customSanitizer((value) => validator.escape(value)),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")
    // Sanitasi input untuk menghindari XSS
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, ""); // Hapus tag HTML
    })
    // Escape karakter untuk menghindari XSS
    .customSanitizer((value) => validator.escape(value)),
];
