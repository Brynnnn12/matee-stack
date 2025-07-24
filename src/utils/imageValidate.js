const fs = require("fs");

/**
 * Validasi gambar yang diunggah
 */
exports.validateImage = (req) => {
  if (!req.file) {
    return "Gambar wajib diunggah";
  }
  if (!req.file.mimetype.startsWith("image/")) {
    return "File yang diunggah harus berupa gambar";
  }
  return null;
};

/**
 * Menghapus gambar dari sistem file
 */
exports.deleteImage = (imagePath) => {
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`Berhasil menghapus file: ${imagePath}`);
    } else {
      console.log(`File tidak ditemukan: ${imagePath}`);
    }
  } catch (error) {
    console.error(`Error saat menghapus file ${imagePath}: ${error.message}`);
  }
};
