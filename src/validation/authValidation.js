const { body } = require("express-validator");
const validator = require("validator");

/**
 * validasi untuk register dan login
 * @module validation/authValidation
 * @requires express-validator
 * @requires validator
 * @description
 * Modul ini berisi validasi untuk proses pendaftaran (register) dan masuk (login) pengguna.
 * Validasi ini memastikan bahwa data yang diterima sesuai dengan format yang diharapkan,
 * termasuk sanitasi input untuk mencegah serangan XSS (Cross-Site Scripting).
 */
exports.registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .isLength({ min: 3 })
    .withMessage("Nama minimal 3 karakter")
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, "");
    })
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama hanya boleh terdiri dari huruf dan spasi")
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

    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, "");
    })

    .customSanitizer((value) => validator.escape(value)),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter")

    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, "");
    })

    .customSanitizer((value) => validator.escape(value)),
];
