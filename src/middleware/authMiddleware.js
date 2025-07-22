const { User, Role } = require("../models");

exports.attachUser = async (req, res, next) => {
  if (req.session.userId) {
    const user = await User.findByPk(req.session.userId, {
      include: [{ model: Role, as: "role" }],
    });
    if (user) {
      req.user = user; // Untuk akses di controller/route
      res.locals.user = user; // Untuk akses langsung di EJS
    }
  }
  next();
};
// Proteksi: hanya user login yang bisa akses
exports.protect = (req, res, next) => {
  if (!req.session.userId) {
    req.flash("message", "Silakan login terlebih dahulu");
    return res.redirect("/login");
  }
  next();
};

// Otorisasi: hanya role tertentu yang bisa akses
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
