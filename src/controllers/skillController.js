const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { Character, Skill } = require("../models");

exports.index = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const {
    docs: skills,
    pages,
    total,
  } = await Skill.paginate({
    page,
    paginate: limit,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Character,
        as: "character",
        attributes: ["name"],
      },
    ],
  });

  res.render("dashboard/skills", {
    title: "Skills",
    skills,
    currentPage: "skills",
    page,
    pages,
    total,
    limit,
    layout: "layouts/dashboard",
  });
});

exports.create = asyncHandler(async (req, res) => {
  const character = await Character.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard/skills/create", {
    title: "Create Skills",
    currentPage: "skills",
    character,
    layout: "layouts/dashboard",
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
});

exports.store = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect("/dashboard/skills/create");
  }

  const { name, description, character_id } = req.body;
  try {
    await Skill.create({
      name,
      description,
      character_id,
    });
    req.flash("success", "Skill berhasil ditambahkan");
    res.redirect("/dashboard/skills");
  } catch (error) {
    req.flash("errors", [{ msg: error.message }]);
    req.flash("old", req.body);
    res.redirect("/dashboard/skills/create");
  }
});

// GET /dashboard/skills/:id/edit
exports.edit = asyncHandler(async (req, res) => {
  const skill = await Skill.findByPk(req.params.id);
  if (!skill) {
    req.flash("errors", [{ msg: "Skill tidak ditemukan" }]);
    return res.redirect("/dashboard/skills");
  }
  const character = await Character.findAll({ order: [["createdAt", "DESC"]] });
  res.render("dashboard/skills/edit", {
    title: "Edit Skill",
    currentPage: "skills",
    character,
    skill,
    layout: "layouts/dashboard",
    errors: req.flash("errors"),
    old: req.flash("old")[0] || {},
  });
});

// PUT /dashboard/skills/:id
exports.update = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    req.flash("old", req.body);
    return res.redirect(`/dashboard/skills/${req.params.id}/edit`);
  }
  const { name, description, character_id } = req.body;
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      req.flash("errors", [{ msg: "Skill tidak ditemukan" }]);
      return res.redirect("/dashboard/skills");
    }
    await skill.update({ name, description, character_id });
    req.flash("success", "Skill berhasil diupdate");
    res.redirect("/dashboard/skills");
  } catch (error) {
    req.flash("errors", [{ msg: error.message }]);
    req.flash("old", req.body);
    res.redirect(`/dashboard/skills/${req.params.id}/edit`);
  }
});

// DELETE /dashboard/skills/:id
exports.destroy = asyncHandler(async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      req.flash("errors", [{ msg: "Skill tidak ditemukan" }]);
      return res.redirect("/dashboard/skills");
    }
    await skill.destroy();
    req.flash("success", "Skill berhasil dihapus");
    res.redirect("/dashboard/skills");
  } catch (error) {
    req.flash("errors", [{ msg: error.message }]);
    res.redirect("/dashboard/skills");
  }
});
