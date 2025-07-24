const { User, Role } = require("../models");
const { validationResult } = require("express-validator");

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("message", "Validation error");
    return res.status(400).render("auth/register", {
      errors: errors.array(),
    });
  }
  const { name, email, password, avatar } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      req.flash("message", "Email sudah terdaftar");
      return res.status(400).render("auth/register", {
        errors: [],
      });
    }
    const user = await User.create({ name, email, password, avatar });

    const userWithRole = await User.findByPk(user.id, {
      include: [
        {
          model: Role,
          as: "role",
          where: { name },
        },
      ],
    });
    req.session.userId = user.id;

    req.flash("message", "Registrasi berhasil");
    return res.redirect("/");
  } catch (err) {
    if (
      err.name === "SequelizeValidationError" &&
      err.errors.some((e) => e.path === "roleId")
    ) {
      req.flash(
        "message",
        "Role default 'User' tidak ditemukan. Pastikan data role sudah ada di database."
      );
      return res.status(400).render("auth/register", {
        errors: [],
      });
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("message", "Validation error");
    return res.status(400).render("auth/login", {
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: "role",
      },
    ],
  });

  if (!user) {
    req.flash("message", "Email tidak ditemukan");
    return res.status(400).render("auth/login", {
      errors: [],
    });
  }
  const isMatch = await user.correctPassword(password);
  if (!isMatch) {
    req.flash("message", "Password salah");
    return res.status(400).render("auth/login", {
      errors: [],
    });
  }

  req.session.userId = user.id;
  req.flash("message", "Login berhasil");
  return res.redirect("/");
};

exports.logout = (req, res) => {
  req.flash("message", "Logout berhasil");
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout gagal");
    res.clearCookie(process.env.SESSION_NAME || "sessionId");
    res.redirect("/");
  });
};
