const { User, Role } = require("../models");

/**
 * middleware untuk melampirkan user ke request
 * jika user sudah login, user akan diambil dari database berdasarkan session userId
 * jika user belum login, user akan di-set ke null
 * ini digunakan untuk mengakses informasi user di dalam route handler
 */
exports.attachUser = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId, {
      include: [{ model: Role, as: "role" }],
    });
    req.user = user || null;
    res.locals.user = user || null;
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};

/**
 * middleware untuk melindungi rute yang memerlukan otentikasi
 * jika user belum login, redirect ke halaman login
 * Jika user sudah login, lanjutkan ke rute berikutnya
 * Jika user sudah login, tetapi tidak memiliki role yang sesuai, redirect ke halaman home
 */
exports.protect = (req, res, next) => {
  if (!req.session.userId) {
    req.flash("message", "Silakan login terlebih dahulu");
    return res.redirect("/login");
  }
  next();
};

/**
 * middleware untuk mengotorisasi akses berdasarkan role
 * jika user tidak memiliki role yang sesuai, redirect ke halaman home
 * Jika user memiliki role yang sesuai, lanjutkan ke rute berikutnya
 */
exports.authorize = (...roles) => {
  return async (req, res, next) => {
    if (!req.session.userId) {
      req.flash("message", "Akses ditolak");
      return res.redirect("/login");
    }
    const user = await User.findByPk(req.session.userId, {
      include: { model: Role, as: "role" },
    });
    if (!user || !user.role || !roles.includes(user.role.name)) {
      req.flash("message", "Anda tidak punya akses ke halaman ini");
      return res.redirect("/");
    }
    next();
  };
};
