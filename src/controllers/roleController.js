const { Role } = require("../models");
const { validationResult } = require("express-validator");

exports.index = async (req, res) => {
  const roles = await Role.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.render("dashboard/roles", {
    title: "Roles",
    roles,
    currentPage: "roles",
    message: req.flash("message"),
    layout: "layouts/dashboard",
  });
};

exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const roles = await Role.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(400).render("dashboard/roles", {
      title: "Roles",
      roles,
      errors: errors.array(),
    });
  }

  const { name } = req.body;
  const role = await Role.create({ name });
  req.flash("message", "Role berhasil dibuat");
  res.redirect("/dashboard/roles");
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  await Role.destroy({ where: { id } });
  if (!id) {
    req.flash("message", "Role tidak ditemukan");
    return res.redirect("/dashboard/roles");
  }
  req.flash("message", "Role berhasil dihapus");
  res.redirect("/dashboard/roles");
};
