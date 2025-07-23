const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, GIF are allowed"), false);
  }
};

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

const uploadUserAvatar = multer({
  storage: storageUserAvatar,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("avatar");

const uploadGameImage = multer({
  storage: storageGameImage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("image"); // <- gunakan .single("image") agar di controller req.file.filename

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
