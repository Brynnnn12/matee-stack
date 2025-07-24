const slugify = require("slugify");

/**
 * Fungsi untuk menghasilkan slug dari teks
 * @param {string} text - Teks yang akan diubah menjadi slug
 * @return {string} - Slug yang dihasilkan
 * Example: "Hello World!" -> "hello-world"
 */
exports.generateSlug = (text) => {
  const slug = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });

  return slug;
};
