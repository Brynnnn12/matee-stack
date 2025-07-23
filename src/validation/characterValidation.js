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
    // Sanitasi input untuk menghindari XSS
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, ""); // Hapus tag HTML
    })
    // Validasi karakter yang diperbolehkan
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama karakter hanya boleh terdiri dari huruf dan spasi")
    // Escape karakter untuk menghindari XSS
    .customSanitizer((value) => validator.escape(value)),
  body("description")
    .optional()
    .isString()
    .withMessage("Deskripsi harus berupa string")
    .isLength({ min: 10 })
    .withMessage("Deskripsi minimal 10 karakter")
    //karakter yang diperbolehkan
    .matches(/^[a-zA-Z0-9\s.,!?]+$/)
    .withMessage(
      "Deskripsi hanya boleh terdiri dari huruf, angka, spasi, dan tanda baca"
    )
    // Sanitasi input untuk menghindari XSS
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "")
        .replace(/<[^>]*>/g, ""); // Hapus tag HTML
    })
    // Escape karakter untuk menghindari XSS
    .customSanitizer((value) => validator.escape(value)),
  body("game_id")
    .notEmpty()
    .withMessage("Game wajib dipilih")
    .isUUID()
    .withMessage("Game tidak valid"),
];
module.exports = { characterValidation };
