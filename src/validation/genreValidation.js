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
    //kalau ada <script> atau <style> di input, akan dihapus
    .customSanitizer((value) => {
      return value
        .replace(/<script.*?>.*?<\/script>/gi, "")
        .replace(/<style.*?>.*?<\/style>/gi, "");
    })
    //tidak boleh ada angka karakter
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Nama genre hanya boleh terdiri dari huruf dan spasi")
    //ini untuk menghindari XSS
    .customSanitizer((value) => {
      return validator.escape(value);
    }),
];
