const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/**
 * Middleware untuk memfilter file yang diupload
 * Hanya mengizinkan file dengan tipe tertentu (JPG, PNG, GIF)
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diizinkan (JPG, PNG, GIF)"), false);
  }
};

/**
 * Storage configuration untuk avatar pengguna
 * Menggunakan diskStorage untuk menyimpan file di server
 */
const storageUserAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../public/uploads/avatars");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    let username =
      req.body?.username || (req.user && req.user.username) || "user";
    cb(null, `avatar-${username}-${uniqueSuffix}${ext}`);
  },
});

/**
 * Storage configuration untuk gambar game
 * Menggunakan diskStorage untuk menyimpan file di server
 */
const storageGameImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../public/uploads/games");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    let gameName = req.body?.name || req.body?.gameName || "game";
    cb(null, `game-${gameName}-${uniqueSuffix}${ext}`);
  },
});

/**
 * Storage configuration untuk gambar karakter
 * Menggunakan diskStorage untuk menyimpan file di server
 */
const storageCharacterImage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../../public/uploads/characters");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    let characterName =
      req.body?.name || req.body?.characterName || "character";
    cb(null, `character-${characterName}-${uniqueSuffix}${ext}`);
  },
});

/**
 * Middleware untuk mengupload avatar pengguna, gambar game, dan gambar karakter
 * Menggunakan multer dengan konfigurasi storage, fileFilter, dan limits
 */
const uploadUserAvatar = multer({
  storage: storageUserAvatar,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("avatar");

const uploadGameImage = multer({
  storage: storageGameImage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

const uploadCharacterImage = multer({
  storage: storageCharacterImage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

module.exports = {
  uploadUserAvatar,
  uploadGameImage,
  uploadCharacterImage,
  storageUserAvatar,
  storageGameImage,
  storageCharacterImage,
};
